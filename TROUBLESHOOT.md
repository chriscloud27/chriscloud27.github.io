# Troubleshooting Guide

## Package Lock File Sync Error

### The Error
```
npm error code EUSAGE
npm error `npm ci` can only install packages when your package.json and package-lock.json 
or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
npm error Missing: @swc/helpers@0.5.19 from lock file
```

### What's Happening

Your **package.json** and **package-lock.json** files are out of sync.

#### `package.json` (Dependency Declaration)
- Lists the packages your project needs
- Uses **flexible version ranges** (e.g., `^15.5.12`)
- Updated when you run `npm install package-name`
- Human-readable

Example:
```json
{
  "dependencies": {
    "next": "^15.5.12",
    "@swc/helpers": "^0.5.19"
  }
}
```

#### `package-lock.json` (Dependency Lock)
- Records **exact versions** that were installed
- Uses **fixed pinned versions** (e.g., `15.5.12`, not `^15.5.12`)
- Ensures everyone gets identical builds
- Machine-readable

Example:
```json
{
  "packages": {
    "node_modules/next": {
      "version": "15.5.12",
      "resolved": "https://registry.npmjs.org/next/-/next-15.5.12.tgz"
    },
    "node_modules/@swc/helpers": {
      "version": "0.5.19",
      "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.19.tgz"
    }
  }
}
```

### Why Files Get Out of Sync

1. **You run `npm install`** locally → adds `@swc/helpers` to both files
2. **You commit only `package.json`** → lock file is missing from git
3. **GitHub Actions checks out code** → sees `@swc/helpers` in package.json but not in package-lock.json
4. **`npm ci` fails** → refuses to install with mismatched files

### How to Solve

#### Without Husky (Manual)
```bash
# Local machine
npm install

# Commit updated lock file
git add package-lock.json
git commit -m "Update lock file"
git push
```

#### With Husky (Automatic Prevention) ✅
Husky **catches this before you push**:

1. You try to commit:
   ```bash
   git commit -m "Add new package"
   ```

2. Husky runs the **pre-commit hook** automatically:
   ```bash
   npx lint-staged  # Checks if package.json changed
   npm run build    # Validates the entire project
   ```

3. **lint-staged detects** you changed `package.json` without updating lock file:
   ```bash
   npm ci --dry-run  # Simulates install, catches sync issues
   ```

4. **Commit is blocked** with an error message

5. **You fix it locally**:
   ```bash
   npm install
   git add package-lock.json
   git commit -m "Add new package"  # Now it works
   ```

### Key Difference: CI Detection vs. Pre-commit Prevention

| Scenario | Without Husky | With Husky |
|----------|---------------|-----------|
| You run `npm install` locally | ✓ Works | ✓ Works |
| You forget to commit lock file | ✓ Commits successfully | ❌ Blocks commit |
| You push to GitHub | ❌ CI fails (wasted time) | ✓ Never pushed bad code |
| You discover the error | On GitHub (after push) | On your machine (before push) |

### Best Practices

✅ **Always do this:**
- Run `npm install` to add/update dependencies
- Commit the **updated `package-lock.json`**
- Let Husky catch sync issues before pushing

❌ **Never do this:**
- Edit `package-lock.json` manually
- Commit `package.json` without committing `package-lock.json`
- Ignore pre-commit hook failures

### Verify Your Setup

Check that Husky is installed and configured:

```bash
# Should have a .husky directory
ls -la .husky/

# Should show pre-commit hook
cat .husky/pre-commit

# Should show lint-staged in package.json
grep -A2 "lint-staged" package.json
```

If Husky hooks aren't running automatically, reinstall:
```bash
npm install
npx husky install
```

---

## npm Version Mismatch Error

### The Error
```
npm error `npm ci` can only install packages when your package.json and package-lock.json 
or npm-shrinkwrap.json are in sync.
```

**Even though `npm ci --dry-run` works locally!**

### Root Cause: Different npm Versions

Your **local npm version** and **GitHub Actions npm version** generate lock files differently.

#### Example Scenario:
- **Local:** npm 11.11.0 → generates lock file in format v3+
- **GitHub Actions:** npm 10.x → expects lock file in format v2/v3 (different interpretation)
- **Result:** Lock file valid locally, rejected in CI

### How to Verify

**Check local version:**
```bash
node --version  # Should be >=20.0.0
npm --version   # Should be >=11.11.0
```

**Check CI version:** Look at GitHub Actions logs in "Debug - Environment info" step

### The Fix

✅ **Version pinning is already configured:**

1. **package.json** enforces minimum versions:
```json
{
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=11.11.0"
  }
}
```

2. **GitHub Actions** pins exact version in `.github/workflows/deploy.yml`:
```yaml
- name: Upgrade to npm 11.11.0
  run: npm install -g npm@11.11.0
```

3. **Local development** warns if wrong version via `.npmrc`

### If You Still Get the Error

**Regenerate lock file with correct npm version:**
```bash
# Verify you have npm 11.11.0+
npm --version

# If not, upgrade first
npm install -g npm@11.11.0

# Regenerate lock file
rm package-lock.json
npm install

# Commit and push
git add package-lock.json
git commit -m "Regenerate lock file with npm 11.11.0"
git push
```

### Prevention

✅ Always use npm 11.11.0+ for this project
✅ CI automatically upgrades to matching version
✅ Lock file generated with consistent npm version across all environments

