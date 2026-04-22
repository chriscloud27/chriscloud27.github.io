# Multi-Project Setup

This document captures the broader architecture narrative that ADRs support.

Use it to explain stable system context, repo-wide architecture boundaries, and the relationships between major subsystems. Use ADRs in [`docs/adr/`](docs/adr/) for individual architecture decisions.

## How this document differs from ADRs

- This document explains the overall setup and long-lived context
- ADRs record one decision per file
- This document can reference multiple ADRs without replacing them
- ADRs should stay lightweight even when this document is more narrative

## What belongs here

- High-level architecture context for the repo
- Cross-cutting constraints that influence multiple decisions
- Relationships between major project areas or deployment surfaces
- Stable operating assumptions that help future contributors interpret ADRs

## What does not belong here

- Implementation detail for one feature
- Bug-fix rationale
- Decision logs that should instead be individual ADRs

## ADR relationship

When an architecture-level decision is made, document the decision in `docs/adr/` and update this file only if the broader system narrative changes.

Treat this file as the companion document for architecture context, not as a substitute for ADRs.
