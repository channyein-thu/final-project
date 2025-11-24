const CURRENT_USER_KEY = "cleaning_current_user";
const SERVICE_TYPES_KEY = "cleaning_service_types";
const USERS_DB_KEY = "cleaning_users_db"; // Fake Firebase users collection
const defaultServices = [
  {
    id: "basic",
    name: "Basic Cleaning",
    description: "Routine tidy-up for apartments or condos (2-3 hours).",
    basePrice: 80,
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    description:
      "Detailed scrub for kitchens, bathrooms, and hard-to-reach spots.",
    basePrice: 150,
  },
  {
    id: "move-out",
    name: "Move-out Cleaning",
    description: "Top-to-bottom clean ready for landlord inspection.",
    basePrice: 220,
  },
];

const read = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn("storage read failed", key, error);
    return fallback;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("storage write failed", key, error);
  }
};

// Fake Firebase Auth - Users Database
const getUsersDB = () => read(USERS_DB_KEY, {});
const saveUsersDB = (usersDB) => write(USERS_DB_KEY, usersDB);

// Seed demo accounts on first load
export function seedDemoAccounts() {
  const usersDB = getUsersDB();

  const demoAccounts = [
    {
      id: "demo_customer_001",
      email: "customer@demo.com",
      password: "demo123",
      name: "Demo Customer",
      phone: "555-0001",
      role: "customer",
      createdAt: new Date().toISOString(),
      bookings: [
        {
          id: "booking_demo_001",
          customerId: "demo_customer_001",
          customerName: "Demo Customer",
          customerPhone: "555-0001",
          serviceTypeId: "basic",
          date: "2025-12-01",
          time: "10:00",
          address: "123 Demo Street, Test City",
          notes: "This is a demo booking",
          status: "confirmed",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: "demo_staff_001",
      email: "staff@demo.com",
      password: "demo123",
      name: "Demo Staff",
      phone: "555-0002",
      role: "staff",
      createdAt: new Date().toISOString(),
      bookings: [],
    },
  ];

  // Only seed if demo accounts don't exist
  demoAccounts.forEach((account) => {
    const key = account.email.toLowerCase();
    if (!usersDB[key]) {
      usersDB[key] = account;
    }
  });

  saveUsersDB(usersDB);
}

// Register new user account
export function registerUser(email, password, name, phone, role) {
  const usersDB = getUsersDB();
  const userKey = email.toLowerCase().trim();

  if (usersDB[userKey]) {
    return { error: "Email already registered" };
  }

  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: email,
    password: password, // In real app, this would be hashed
    name: name,
    phone: phone,
    role: role,
    createdAt: new Date().toISOString(),
    bookings: [],
  };

  usersDB[userKey] = newUser;
  saveUsersDB(usersDB);
  return { user: newUser };
}

// Login with email and password
export function loginUser(email, password) {
  const usersDB = getUsersDB();
  const userKey = email.toLowerCase().trim();

  const user = usersDB[userKey];
  if (!user) {
    return { error: "Account not found" };
  }

  if (user.password !== password) {
    return { error: "Incorrect password" };
  }

  return { user };
}

// Legacy: Find or create user account (for backward compatibility)
export function authenticateUser(email, name, phone, role) {
  const usersDB = getUsersDB();
  const userKey = email.toLowerCase().trim();

  if (usersDB[userKey]) {
    return usersDB[userKey];
  }

  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: email,
    password: "password123", // Default password
    name: name,
    phone: phone,
    role: role,
    createdAt: new Date().toISOString(),
    bookings: [],
  };

  usersDB[userKey] = newUser;
  saveUsersDB(usersDB);
  return newUser;
}

// Get user from database by ID
const getUserFromDB = (userId) => {
  const usersDB = getUsersDB();
  for (const userKey in usersDB) {
    if (usersDB[userKey].id === userId) {
      return usersDB[userKey];
    }
  }
  return null;
};

// Update user in database
const updateUserInDB = (user) => {
  const usersDB = getUsersDB();
  const userKey = user.email.toLowerCase().trim();
  usersDB[userKey] = user;
  saveUsersDB(usersDB);
};

export const getCurrentUser = () => read(CURRENT_USER_KEY);
export const setCurrentUser = (user) => write(CURRENT_USER_KEY, user);
export const clearCurrentUser = () => localStorage.removeItem(CURRENT_USER_KEY);

export function seedDefaultServiceTypes() {
  const existing = read(SERVICE_TYPES_KEY);
  if (!existing || existing.length === 0) {
    write(SERVICE_TYPES_KEY, defaultServices);
  }
}

export const getServiceTypes = () => {
  const services = read(SERVICE_TYPES_KEY);
  if (!services || services.length === 0) {
    seedDefaultServiceTypes();
    return defaultServices;
  }
  return services;
};

// Bookings - stored per user in fake Firebase
export const createBooking = (bookingInput, currentUser) => {
  const dbUser = getUserFromDB(currentUser.id);
  if (!dbUser) return null;

  const newBooking = {
    id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    customerId: currentUser.id,
    customerName: currentUser.name,
    customerPhone: currentUser.phone,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...bookingInput,
  };

  dbUser.bookings.push(newBooking);
  updateUserInDB(dbUser);
  return newBooking;
};

export const listBookingsByCustomer = (customerId) => {
  const dbUser = getUserFromDB(customerId);
  return dbUser ? dbUser.bookings : [];
};

export const listAllBookings = () => {
  // Staff can see all bookings from all users
  const usersDB = getUsersDB();
  const allBookings = [];

  for (const userKey in usersDB) {
    const user = usersDB[userKey];
    if (user.bookings && Array.isArray(user.bookings)) {
      allBookings.push(...user.bookings);
    }
  }

  return allBookings.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};

export const updateBookingStatus = (bookingId, newStatus) => {
  const usersDB = getUsersDB();

  // Find the booking across all users
  for (const userKey in usersDB) {
    const user = usersDB[userKey];
    if (user.bookings) {
      const booking = user.bookings.find((b) => b.id === bookingId);
      if (booking) {
        booking.status = newStatus;
        booking.updatedAt = new Date().toISOString();
        updateUserInDB(user);
        return booking;
      }
    }
  }
  return null;
};

// Clear current user's bookings only
export const clearUserData = () => {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const dbUser = getUserFromDB(currentUser.id);
  if (dbUser) {
    dbUser.bookings = [];
    updateUserInDB(dbUser);
  }
};

// Clear ALL demo data (all users and system data)
export const clearAllData = () => {
  localStorage.removeItem(USERS_DB_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  // keep services seeded for next session
};

// Get all registered users (for debugging/admin)
export const getAllUsers = () => getUsersDB();
