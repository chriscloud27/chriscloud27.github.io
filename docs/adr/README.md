# ADR Index

This folder is the canonical home for Architecture Decision Records (ADRs) in this repo.

## Purpose

Use ADRs for decision-level architecture records only. Each ADR captures one decision that affects the repo's architecture, core platform choices, or repo-wide patterns.

Use [`0000-template.md`](0000-template.md) as the starting point for every new ADR.

Broader architecture narrative belongs in [`../MULTI-PROJECT-SETUP.md`](../MULTI-PROJECT-SETUP.md). Use that document for system context that spans multiple decisions.

## When to write an ADR

Write an ADR when a decision:

- Changes or establishes the overall architecture
- Chooses between major technologies or platforms
- Establishes a pattern that future code must follow repo-wide
- Rejects a plausible alternative that needs to stay documented
- Would be confusing or surprising to a new contributor without context

Do not write an ADR for:

- Implementation details
- Bug fixes
- Obvious code-level decisions

## Numbering and status

- Use the next available four-digit number: `0001-...`, `0002-...`, `0003-...`
- Keep one file per decision
- Use one of these status values only: `proposed`, `accepted`, `deprecated`, `superseded by ADR-XXXX`
- Cross-reference related ADRs when one decision depends on another

## Writing rules

- Keep the structure fixed: Title, Status, Date, Context, Decision, Consequences
- Make the Decision section one clear statement in active voice
- Put trade-offs, constraints, and follow-up impact in Consequences
- If comparing alternatives, keep the option framing inside Context

## Historical note

Some older decision context still lives in docs such as `docs/MIGRATION-SUMMARY.md` and `memory/MEMORY.md`. Do not treat those as ADRs unless they are explicitly promoted into this folder.
