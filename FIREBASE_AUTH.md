# 🔥 Fake Firebase Authentication System

## Overview

This app implements a **fake Firebase-style authentication system** using localStorage to simulate a real backend database. Each user account is stored separately based on their email address, and their data persists across sessions.

## How It Works

### User Registration & Login

When a user logs in with their email, the system:

1. **Checks if the email exists** in the "users database" (localStorage)
2. **Returns existing account** if found (with all their bookings preserved)
3. **Creates new account** if email is new (with empty bookings array)

### Data Structure

```javascript
// localStorage key: 'cleaning_users_db'
{
  "user@example.com": {
    id: "user_1234567890_abc123",
    email: "user@example.com",
    name: "John Doe",
    phone: "555-1234",
    role: "customer",
    createdAt: "2025-11-24T...",
    bookings: [
      {
        id: "booking_...",
        customerId: "user_1234567890_abc123",
        serviceTypeId: "basic",
        date: "2025-12-01",
        time: "10:00",
        address: "123 Main St",
        notes: "Please call before arrival",
        status: "pending",
        createdAt: "2025-11-24T...",
        updatedAt: "2025-11-24T..."
      }
    ]
  },
  "another@example.com": {
    // Another user's data...
  }
}
```

## Key Features

### ✅ Persistent User Data

- Each email address has its own account
- Bookings are stored with the user account
- Data persists after logout
- Logging in again with the same email restores all data

### ✅ Multi-User Support

- Multiple users can have accounts
- Each user sees only their own bookings (customers)
- Staff can see all bookings from all users

### ✅ Role-Based Access

- **Customer role**: Create and manage their own bookings
- **Staff role**: View and update all bookings across all users

## Usage Examples

### Customer Flow

```javascript
// First login - creates new account
login({
  email: "customer@test.com",
  name: "Alice",
  phone: "555-0001",
  role: "customer",
});
// Creates booking -> Stored in customer@test.com's bookings array
// Logout

// Second login - returns existing account
login({
  email: "customer@test.com",
  name: "Alice", // Can be same or different
  phone: "555-0001",
  role: "customer",
});
// All previous bookings are restored! ✨
```

### Staff Flow

```javascript
// Staff login
login({
  email: "staff@test.com",
  name: "Bob",
  phone: "555-0002",
  role: "staff",
});
// Can see and manage bookings from ALL users
```

## API Functions

### `authenticateUser(email, name, phone, role)`

Finds or creates user account based on email (case-insensitive).

### `createBooking(formData, currentUser)`

Creates booking and stores it in the user's bookings array.

### `listBookingsByCustomer(customerId)`

Returns all bookings for a specific user.

### `listAllBookings()`

Returns all bookings from all users (for staff).

### `updateBookingStatus(bookingId, newStatus)`

Updates booking status across all users.

### `clearUserData()`

Deletes only the current user's bookings (keeps account).

### `clearAllData()`

Deletes ALL user accounts and system data (nuclear option).

## Privacy Controls

The app provides two levels of data clearing:

1. **Clear My Bookings** (🧹 Warning level)

   - Deletes only your bookings
   - Keeps your account
   - Requires login to use

2. **Delete Everything** (🗑️ Danger level)
   - Deletes ALL user accounts
   - Deletes ALL bookings
   - Resets entire system

## Testing the System

### Test Case 1: Data Persistence

1. Login as `alice@test.com` (customer)
2. Create 2 bookings
3. Logout
4. Login again as `alice@test.com`
5. ✅ Both bookings should appear

### Test Case 2: User Isolation

1. Login as `alice@test.com` (customer)
2. Create 1 booking
3. Logout
4. Login as `bob@test.com` (customer)
5. ✅ Should see empty bookings list (Alice's data is separate)

### Test Case 3: Staff Access

1. Login as `alice@test.com` (customer) → Create booking
2. Login as `bob@test.com` (customer) → Create booking
3. Login as `staff@test.com` (staff)
4. ✅ Should see both Alice's and Bob's bookings

## Technical Notes

- Uses **localStorage** as the database (survives page refresh)
- Email is used as the unique key (case-insensitive)
- User IDs are randomly generated on account creation
- Bookings IDs are timestamp-based with random suffix
- No actual network requests (100% client-side)
- Data is stored in plain text (not encrypted, demo only)

## Benefits Over Previous System

**Before (Simple Auth):**

- ❌ New user ID generated every login
- ❌ Data lost when switching users
- ❌ All bookings shared globally

**Now (Fake Firebase):**

- ✅ Stable user IDs based on email
- ✅ Data persists per user account
- ✅ Proper user isolation
- ✅ Simulates real auth system behavior

## Demo Script

**"This app simulates Firebase Authentication using localStorage. Each email address gets its own account with persistent data. When you log in with the same email, all your previous bookings are restored. Staff accounts can see bookings from all users, while customers only see their own."**
