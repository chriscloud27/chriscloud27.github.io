import type { MDXComponents } from "mdx/types";

// This file is required by @next/mdx.
// It defines the default MDX component mapping for the whole app.
// Slide-specific overrides are handled in /components/slides/MDXComponents.tsx
// and passed via MDXProvider in each deck.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
