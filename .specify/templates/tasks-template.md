---
description: "Task list template for cleaning service SPA features"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Include Vitest/RTL tasks only when explicitly requested. Manual demo scripts are valid deliverables when noted in the spec.

**Organization**: Tasks are grouped by user story so Customer and Staff work stay independently testable. Use the `[Story]` tag to call out role ownership (`CUST`, `STAFF`, `PRIV`).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Use role-aligned labels (e.g., `US1-CUST`, `US2-STAFF`, `US3-PRIV`)
- Include exact file paths in descriptions (e.g., `src/pages/BookingsPage.jsx`)

## Path Conventions

- SPA root: `src/` with subfolders `components/`, `pages/`, `hooks/`, `data/`, `router/`, `styles/`
- Tests (if any): `src/__tests__/` colocated with components
- Static assets: `public/`
- Data layer lives in `src/data/` and exposes hooks via `src/hooks/`

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Privacy/data obligations from the constitution
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Keep Vite/React project healthy and aligned with guardrails.

- [ ] T001 Ensure `src/components`, `src/pages`, `src/hooks`, and `src/data` folders exist per plan structure
- [ ] T002 Install/verify React Router and baseline styling approach (CSS Modules or Tailwind)
- [ ] T003 [P] Configure project linting/formatting plus sample Vitest setup (optional)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T004 Build or update `src/data/users.js`, `serviceTypes.js`, and `bookings.js` with entity schemas + sample seeds
- [ ] T005 [P] Add `src/hooks/useBookings.js` (or equivalent) to wrap localStorage CRUD with status helpers
- [ ] T006 [P] Implement `src/router/index.jsx` with routes for Customer, Staff, Privacy pages
- [ ] T007 Define shared UI states (loading, empty, error) in `src/components/states/`
- [ ] T008 Wire privacy data delete helper that clears localStorage keys safely

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Customer Booking Flow (Priority: P1) 🎯 MVP

**Goal**: Customer can create, view, reschedule, and cancel bookings with inline validation.

**Independent Test**: Manually walk through booking creation/reschedule in Customer UI while verifying loading/empty states.

### Tests for User Story 1 (OPTIONAL) ⚠️

- [ ] T010 [P] [US1-CUST] Component test for `BookingForm` validation in `src/__tests__/BookingForm.test.jsx`

### Implementation for User Story 1

- [ ] T011 [US1-CUST] Build `src/components/BookingForm.jsx` with validation + status messaging
- [ ] T012 [US1-CUST] Implement `src/pages/CustomerDashboard.jsx` (lists upcoming/past bookings with empty/loading states)
- [ ] T013 [P][US1-CUST] Add reschedule + cancel actions that call `useBookings` mutations and persist to localStorage
- [ ] T014 [US1-CUST] Document manual demo steps covering create → cancel flow in `specs/[###-feature]/quickstart.md`

**Checkpoint**: Customer story fully testable without Staff UI.

---

## Phase 4: User Story 2 - Staff Assignment Management (Priority: P2)

**Goal**: Staff reviews bookings, updates status, and sees filters per status.

**Independent Test**: Switch to Staff route, confirm actions update the shared data layer instantly.

### Tests for User Story 2 (OPTIONAL) ⚠️

- [ ] T015 [P][US2-STAFF] Hook test for `useBookings` status transitions

### Implementation for User Story 2

- [ ] T016 [US2-STAFF] Create `src/pages/StaffAssignments.jsx` with status filters + list state handling
- [ ] T017 [US2-STAFF] Implement `src/components/StatusBadge.jsx` reused by both roles
- [ ] T018 [US2-STAFF] Wire status update actions (`Pending→Confirmed→Completed`, `→Cancelled`) through data layer
- [ ] T019 [US2-STAFF] Ensure Staff changes reflect in Customer dashboard without refresh (shared hook state)

**Checkpoint**: Both role stories work independently yet share data.

---

## Phase 5: User Story 3 - Privacy & Data Controls (Priority: P3)

**Goal**: Privacy notice page + data deletion UX + responsive polish.

**Independent Test**: Navigate directly to Privacy route, verify copy, delete action, and mobile layout.

### Implementation for User Story 3

- [ ] T020 [US3-PRIV] Build `src/pages/PrivacyPage.jsx` with PDPA notice + link from navbar
- [ ] T021 [US3-PRIV] Implement `ClearLocalDataButton` triggering the helper from Phase 2 and confirming UI state resets
- [ ] T022 [P][US3-PRIV] Add responsive layout tweaks (e.g., CSS utilities) to navbar + dashboards
- [ ] T023 [US3-PRIV] Record privacy compliance steps in `specs/[###-feature]/quickstart.md`

**Checkpoint**: Privacy + UX story complete and demonstrable on its own.

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements spanning multiple user stories.

- [ ] TXXX [P] Update documentation in `specs/[###-feature]/quickstart.md` and project README/Privacy copy
- [ ] TXXX Code cleanup, component extraction, and comments for exam readiness
- [ ] TXXX [P] Optional performance or accessibility checks (e.g., Lighthouse quick scan)
- [ ] TXXX Verify privacy delete flow still works after recent changes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational phase completion; once ready, each role story can proceed independently
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (Customer)**: Starts after Foundational - no dependency on Staff/Privacy
- **User Story 2 (Staff)**: Starts after Foundational - may consume UI components from User Story 1 but must remain testable alone
- **User Story 3 (Privacy)**: Starts after Foundational - depends only on data delete helper from Phase 2

### Within Each User Story

- Write or script tests first (Vitest or documented manual steps) and ensure they fail or are unfulfilled before coding
- Touch `src/data` through hooks only; never mutate localStorage directly inside components
- Deliver loading/empty/error states before cosmetic polish
- Mark blockers in Complexity Tracking when deviating from guardrails

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel
- Data layer, router, and UI state helpers (Phase 2) can run concurrently when touching different files
- Customer, Staff, and Privacy stories can proceed in parallel once hooks are ready, as long as shared components are coordinated
- Tests/documentation tasks can run parallel to implementation if they do not modify the same files

---

## Parallel Example: User Story 1

```bash
# Kick off component + hook validation together
Task: "T010 [P][US1-CUST] Component test for BookingForm"
Task: "T013 [P][US1-CUST] Reschedule/cancel actions"

# Launch responsive+state work in parallel when files differ
Task: "T012 CustomerDashboard state views"
Task: "T011 BookingForm validation"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: Customer Booking Flow
4. **STOP and VALIDATE**: Demo Customer flow end-to-end using the quickstart steps
5. Demo/record results before continuing

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add Customer story → Test independently → Demo
3. Add Staff story → Test independently → Demo
4. Add Privacy story → Test independently → Demo
5. Each increment should include privacy/data considerations relevant to that story

### Parallel Team Strategy

With multiple developers:

1. Complete Setup + Foundational as a group (ensure shared hooks + privacy helpers exist)
2. Assign Customer, Staff, and Privacy stories to different owners
3. Coordinate via shared `src/data` contracts; avoid parallel edits to the same hook
4. Re-run manual demo steps after every merge to ensure localStorage stays consistent

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps tasks to user stories AND roles for traceability
- Each user story must be independently demoable and include privacy + UX states relevant to that flow
- Prefer documenting manual verification steps when automated tests are skipped
- Commit after each task or logical group; keep diffs small for exam review
- Stop at any checkpoint to validate story independently; do not roll multiple stories into one PR
