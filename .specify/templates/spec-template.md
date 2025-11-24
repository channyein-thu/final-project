# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`  
**Created**: [DATE]  
**Status**: Draft  
**Input**: User description: "$ARGUMENTS"

> Constitution alignment: Each spec MUST keep scope within the SPA, document both Customer and Staff impact, and call out privacy/data handling considerations.

## User Scenarios & Testing *(mandatory)*

*Prioritize independent slices. Provide at least one P1 journey for Customers and one for Staff. Tie every acceptance test back to booking statuses and personal data handling.*

### User Story 1 - Customer Booking Flow (Priority: P1)

[Describe how a Customer requests, edits, or cancels a booking]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe the single flow that proves the story succeeds (e.g., "Create booking, see it in Upcoming list, cancel it")]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 2 - Staff Assignment Management (Priority: P2)

[Describe how Staff review bookings, confirm, complete, or cancel]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how Staff-only UI can be validated independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 3 - Privacy & Data Controls (Priority: P3)

[Describe privacy notice, data export/delete, or responsive UX polish]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how privacy/data tasks are validated without relying on other stories]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority and clear owner (Customer or Staff).]

### Edge Cases

- Double-booking attempts for the same slot/service
- Missing or corrupted localStorage entries during app boot
- Status updates after a booking was cancelled by the other role

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Implementation MUST stay inside the React + Vite SPA with JavaScript only.
- **FR-002**: Customers MUST be able to create, view, reschedule, and cancel bookings with validation on date, time, and address fields.
- **FR-003**: Staff MUST be able to view assigned bookings and change status among Pending, Confirmed, Completed, or Cancelled.
- **FR-004**: All booking, user, and service updates MUST go through the shared `src/data` localStorage wrapper and expose hooks for components.
- **FR-005**: The UI MUST present privacy/data-use messaging plus a clear action to delete all locally stored data.
- **FR-006**: Loading, empty, and error states MUST be defined for each page that consumes asynchronous or simulated data operations.

*Use `NEEDS CLARIFICATION` only when a constitutional rule is at risk (e.g., new role, backend call, or expanded scope).*

### Key Entities *(include if feature involves data)*

- **User**: `{ id, role (customer|staff), name, email, phone }` with customer vs staff responsibilities documented.
- **ServiceType**: `{ id, name, description, basePrice }` referenced by bookings and seeded in `src/data/serviceTypes.ts`.
- **Booking**: `{ id, customerId, serviceTypeId, date, time, address, notes, status }` plus derived getters (upcoming/past) for UI hooks.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can complete the targeted story (per role) end-to-end in <3 clicks per step, all within the SPA.
- **SC-002**: Booking state changes propagate instantly to both role views without manual refresh (React state or hooks update).
- **SC-003**: Privacy notice and data delete controls are reachable within 2 interactions from any route.
- **SC-004**: Empty/loading/error states are demonstrated for at least one Customer and one Staff view during the demo.
