<!--
Sync Impact Report
Version change: 0.0.0 → 1.0.0
Modified principles:
- Template Principle 1 → Principle I – Demo-Bounded Scope
- Template Principle 2 → Principle II – Pure React Frontend Stack
- Template Principle 3 → Principle III – Role-Clear Booking Workflows
- Template Principle 4 → Principle IV – Structured Local Data Layer
- Template Principle 5 → Principle V – Privacy & Usability Discipline
Added sections: Architecture Guardrails; Workflow & Quality Gates
Removed sections: None
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
Follow-up TODOs: None
-->

# Cleaning Service Booking Platform Constitution

## Core Principles

### Principle I – Demo-Bounded Scope
Deliverables MUST stay within a 1–3 hour, exam-ready SPA that focuses solely on
booking, managing, or reviewing home cleaning appointments. Scope creep (extra
modules, authentication backends, payment systems, etc.) is prohibited unless the
plan documents how it still fits inside the demo window. Rationale: a strict scope
guarantees the project remains finishable and reviewable during the exam.

### Principle II – Pure React Frontend Stack
All product code MUST use React + Vite with plain JavaScript, React Router for
client-side navigation, and in-browser storage only. Backends, serverless
functions, and TypeScript are explicitly out-of-bounds. Rationale: keeping the
stack uniform preserves speed, reduces setup, and aligns with the exam
expectations.

### Principle III – Role-Clear Booking Workflows
The SPA MUST provide distinct yet consistent flows for Customers (request,
review, cancel, reschedule bookings) and Staff (view assignments, update status to
Pending, Confirmed, Completed, or Cancelled). Any feature proposal that benefits
only one role must explain why parity is unnecessary. Rationale: both roles are
core to demonstrating operational completeness.

### Principle IV – Structured Local Data Layer
User, ServiceType, and Booking entities (with the attributes listed in the
project brief) MUST be defined in a single data-layer module that wraps
localStorage for CRUD and status transitions. Components interact with this layer
through hooks to keep UI code declarative and testable. Rationale: a consistent
data contract makes the in-memory API believable and simplifies demos.

### Principle V – Privacy & Usability Discipline
The app MUST surface a “Privacy & Data Use” page, explain how personal data is
handled locally, and provide a visible action to clear/delete local data. Booking
forms require inline validation, and every page must include empty, loading, and
error states plus responsive layouts. Rationale: PDPA alignment and usability are
non-negotiable exam scoring criteria.

## Architecture Guardrails

- Deliver as a single-page React app with a clear folder split: `src/components`,
  `src/pages`, `src/hooks`, and `src/data` (the data layer). Global state helpers
  live in hooks; domain logic lives in the data layer.
- Only lightweight styling (CSS modules, Tailwind, or inline utility classes) is
  allowed; complex design systems are rejected unless justified in the plan.
- LocalStorage persistence MUST be abstracted behind pure functions so that a
  later backend could replace it without rewriting UI logic.
- Status enums (`Pending`, `Confirmed`, `Completed`, `Cancelled`) and service
  definitions belong in a single source-of-truth file to prevent drift.
- Any mock data used for demos MUST be anonymized and deletable via the privacy
  controls defined above.

## Workflow & Quality Gates

- Every plan/spec/tasks cycle MUST start with a Constitution Check that confirms:
  demo scope fit, React-only stack, both roles represented, data layer hook plan,
  and privacy/delete flows in scope. Work cannot proceed until every gate is
  satisfied or explicitly waived in Complexity Tracking.
- Feature specs MUST contain at least one prioritized user story per role and tie
  acceptance criteria back to the status lifecycle and personal-data handling.
- Implementation plans MUST enumerate how components, hooks, and the data layer
  collaborate, including what lives in localStorage and how it is seeded.
- Tasks MUST group work by user story (Customer vs Staff) and call out validation
  states, loading/empty views, and privacy tasks explicitly rather than hiding
  them under “polish.”
- PR reviewers are responsible for verifying role coverage, local data module
  usage, and privacy controls before approval.

## Governance

This constitution supersedes conflicting documentation for the Cleaning Service
Booking Platform. Amendments require: (1) an RFC describing the need, (2)
evidence that updated plan/spec/templates stay compliant, and (3) reviewer
approval from the acting architect. Version numbers follow semantic rules:
MAJOR for principle changes/removals, MINOR for added principles or governance
sections, PATCH for clarifications. Every enforcement checkpoint (plans, specs,
tasks, PRs) MUST record the constitution version used. Compliance reviews occur
whenever a feature spec or plan is generated; any drift triggers an update here
or explicit waivers logged in Complexity Tracking.

**Version**: 1.0.0 | **Ratified**: 2025-11-24 | **Last Amended**: 2025-11-24
