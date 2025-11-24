# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language/Version**: React 18 + Vite (JavaScript, no TypeScript) — REQUIRED  
**Primary Dependencies**: React Router, localStorage data layer utilities, lightweight styling (CSS Modules or Tailwind)  
**Storage**: Browser `localStorage` wrapped by `/src/data` helpers (no backend)  
**Testing**: Lightweight component tests (e.g., Vitest/React Testing Library) or manual demo steps captured in tasks  
**Target Platform**: Modern Chromium/WebKit browsers on desktop + mobile  
**Project Type**: Single-page web app (SPA)  
**Performance Goals**: Instant navigation (<500 ms view swaps) and responsive layout at common breakpoints  
**Constraints**: Must fit a 1–3 hour demo scope; zero server dependencies; privacy notice + data delete flow  
**Scale/Scope**: Single cleaner booking workflow with sample data sized for demos

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

1. **Demo Scope** – Confirm the feature can be reasoned about, implemented, and demoed inside 1–3 hours without introducing new domains.
2. **React-Only Stack** – Validate no backend, serverless call, or TypeScript work is introduced; all routing stays client-side.
3. **Role Coverage** – Ensure both Customer and Staff touchpoints remain intact (or explain any intentional omission and log in Complexity Tracking).
4. **Data Layer Plan** – Document how `src/data` entities and hooks will change, including status transitions and sample seeds.
5. **Privacy & UX** – Describe the Privacy & Data Use page impact plus how loading/empty/error states and data deletion controls will be covered.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/          # Presentational + form widgets
├── pages/               # Route-level screens for Customers & Staff
├── hooks/               # Reusable state/data hooks (e.g., useBookings)
├── data/                # localStorage-backed entities + seed data
├── router/              # React Router config
├── styles/              # Global styles or Tailwind config
└── __tests__/           # Optional Vitest/RTL tests when authored

public/
└── index.html           # Vite entry point
```

**Structure Decision**: [Document any deviations (e.g., additional feature folders) and justify them against the architecture guardrails.]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
