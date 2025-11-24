CleanEasy – Cleaning Service Booking Platform
System Requirement Analysis, Security & PDPA Compliance, AI-Assisted System Design

TASK 1 – SYSTEM REQUIREMENT ANALYSIS

1. Problem Statement
   The cleaning service industry often relies on manual or phone-based booking processes that lack transparency, efficiency, and proper scheduling systems. Customers cannot easily manage their appointments, while staff members face difficulties tracking service requests across multiple clients.
   CleanEasy is a full-stack web application that enables customers to book cleaning services and manage their appointments online, while staff members can coordinate operations through a centralized management dashboard. The system includes authentication, role-based access control, secure data handling, and persistent storage through a backend database.

2. Core User Stories (Summarized)
   US-001: Customer Account Creation
   Customers can create accounts using their name, email, phone, and password. The system validates inputs and prevents duplicate registrations.
   US-002: Service Booking Creation
   Customers can book cleaning services by selecting a service type, date, time, and address. The system creates the booking with a default status of pending.
   US-003: Booking Management Dashboard
   Customers can view Upcoming (pending/confirmed) and Past (completed/cancelled) bookings. Pending bookings can be cancelled.
   US-004: Edit Pending Bookings
   Customers may modify pending bookings before staff confirmation. The form displays existing data and allows updating service type, schedule, address, and notes.
   US-005: Staff Booking Management
   Staff can view all bookings across customers, filter by status, update booking progress (e.g., pending → confirmed → completed), and cancel bookings if needed.
   US-006: Quick Access for Demonstration
   The system may optionally provide preconfigured accounts for demonstration (customer and staff roles) to simplify evaluation.
   US-007: Data Privacy Management
   Users can access their personal data, review stored information, and request deletion of their account or booking history, following data privacy regulations.

3. Non-Functional Requirements
   NFR-001: Performance
   Pages should load within ~2 seconds.

Booking operations should respond within ~500 ms.

Backend endpoints must efficiently handle concurrent requests.

NFR-002: Usability & Accessibility
Clean, consistent UI with responsive design for desktop and mobile.

Clear validation messages and intuitive workflows.

Buttons and interactive elements include accessible visual states.

NFR-003: Data Persistence & Reliability
All user and booking data is stored in a backend database.

Data must remain intact across sessions, system restarts, and deployments.

The system should prevent unauthorized data exposure or corruption.

NFR-004: Security
Secure password handling (hashing), HTTPS communication, and role-based access control.

Documentation outlines proper authentication flow and secure deployment practices.

4. Key Risks & Threats
   RISK-001: Server or Database Downtime
   Backend downtime could affect booking creation and management.
   Mitigation: redundancy, health checks, monitoring, and automated backups.
   RISK-002: Authentication or Access Control Failures
   Incorrect role handling may allow unauthorized access.
   Mitigation: backend role verification, JWT access control, and audit trails.
   RISK-003: Data Privacy & Security Vulnerabilities
   Exposure of personal data (addresses, phone numbers) due to unsafe handling.
   Mitigation: encryption, secure database access, input validation, and PDPA compliance practices.

TASK 2 – SECURITY & PDPA COMPLIANCE

1. Relevant OWASP Top 10 Items
   (1) A01 – Broken Access Control
   Risk: Users could bypass role restrictions if not enforced server-side.
   Mitigation: Backend authorization middleware, strict role validation, and permission checks on every API endpoint.
   (2) A02 – Cryptographic Failures
   Risk: Sensitive user information may be exposed without encryption.
   Mitigation: Password hashing (bcrypt/Argon2), HTTPS/TLS, encrypted database fields for phone numbers/addresses.
   (3) A07 – Identification & Authentication Failures
   Risk: Weak authentication or brute-force vulnerabilities.
   Mitigation: Strong password policies, rate limiting, JWT session expiration, account lockout after multiple failed attempts.

2. PDPA Data Flow – Privacy by Design
   Data Collected
   Account data: name, email, phone, hashed password

Booking data: service type, date, time, address, notes, status

System metadata: timestamps, booking IDs, activity logs

Legal Basis
Consent obtained during registration

Contractual necessity for providing cleaning services

Legitimate interest for operational coordination

Processing Activities
Authentication and account management

Creating, viewing, updating, and cancelling bookings

Staff coordination and service delivery

Logging status changes for transparency

Storage
All data stored securely in a backend relational database

Backups performed periodically

Retention periods follow PDPA guidelines (e.g., removing inactive accounts)

Sharing
No unnecessary sharing with third parties

Optional integrations (email/SMS/payment) must include data processing agreements

Only staff members can view customer contact info relevant to their duties

User Rights (PDPA)
Access their data

Request correction

Request deletion

Request service history

Withdraw consent or close their account

3. Security Checklist (Condensed)
   Input Validation – sanitize and validate all user inputs on frontend and backend.

Password Security – implement hashing, reset tokens, password strength rules.

Rate Limiting – restrict login attempts and prevent automated abuse.

Encryption – HTTPS communication, optional field encryption in DB.

Logging & Monitoring – monitor authentication events, booking updates, and unusual activity.

TASK 3 – AI-ASSISTED SYSTEM DESIGN

1. Prompts Used
   Ask AI to propose system architecture, database schema, and core APIs.

Ask for detailed REST endpoint specifications.

Ask for database optimization advice.

2. AI-Generated Design Summary
   Recommended Tech Stack
   Frontend: React + TypeScript, React Router, form validation (Zod/React Hook Form)

Backend: NestJS or Express.js with JWT authentication and role guards

Database: PostgreSQL with Prisma ORM

Caching: Redis (sessions, rate limit, availability checks)

Hosting: Vercel/Netlify (frontend) + Railway/Render/AWS (backend)

Core Database Tables
users – customer/staff accounts

service_types – catalog of cleaning services

bookings – appointment details and workflow statuses

booking_status_history – complete audit log for status changes

refresh_tokens – secure token rotation for authentication

Key API Endpoints
POST /bookings – create booking (customer)

PATCH /bookings/:id/status – update booking status (staff)

GET /bookings/me – retrieve user bookings with filtering

3. How This AI Output Supports Development
   Enables migration from basic prototype to a secure, production-level system

Provides a clear database model and endpoint structure

Ensures security (auth, hashing), performance (caching), and reliability

Supports real-time updates and monitoring

Offers a scalable architecture suitable for long-term growth
