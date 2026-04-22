Title: ADR-0004: React Query as Client-Side Data Layer for Static Export

Status: accepted

Date: 2026-04-22

## Context

The site uses static export (ADR-0006), which pre-renders all routes to HTML at build time. Some features require dynamic client-side data fetching after the initial HTML load — for example, form submission state, live webhook responses, and any future polling or real-time data needs.

Two approaches were considered:

**Option A — Native `fetch` + `useState`/`useEffect`:** No additional dependency. Adequate for simple one-off fetches but requires re-implementing caching, deduplication, loading states, and error handling per feature.

**Option B — TanStack React Query:** Provides a consistent API for all client-side fetching with built-in caching (configurable `staleTime`), deduplication, background refetching, loading/error states, and a DevTools extension for debugging. Small bundle overhead justified by the consistency and correctness guarantees.

React Query was chosen to establish a consistent client-side data fetching pattern across all dynamic features, avoiding ad-hoc `useEffect` fetch patterns that tend to accumulate race conditions and missing cleanup.

The `QueryClient` is created with a 1-minute `staleTime` to prevent unnecessary re-fetches on route navigation within a session. It is initialised in `lib/providers.tsx` and wrapped around the app in the root layout.

## Decision

We use TanStack React Query (`@tanstack/react-query`) as the client-side data fetching layer. A `QueryClient` with `staleTime: 60_000` is created per component tree in `lib/providers.tsx` and provided via `QueryClientProvider` in the root layout.

## Consequences

- All client-side data fetching should use `useQuery` or `useMutation` hooks — do not add new `useEffect`-based fetch patterns.
- The `Providers` component is a Client Component (`"use client"`) — it must remain a leaf in the server component tree; do not add server-only imports to it.
- `staleTime: 60_000` means cached data is considered fresh for 1 minute — adjust per-query if a feature requires more aggressive freshness (e.g. real-time scores).
- React Query DevTools are not currently installed — add `@tanstack/react-query-devtools` as a dev dependency if debugging cache behaviour during development.
- Static pre-rendered content (blog posts, page copy) should not use React Query — that data is fetched at build time by Next.js server components. React Query is for post-hydration dynamic data only.
