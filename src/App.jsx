import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.jsx";

import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CustomerNewBookingPage from "./pages/CustomerNewBookingPage";
import CustomerBookingsPage from "./pages/CustomerBookingsPage";
import StaffDashboardPage from "./pages/StaffDashboardPage";
import PrivacyPage from "./pages/PrivacyPage";

function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function RequireRole({ role, children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser || (role && currentUser.role !== role)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/customer/new-booking"
          element={
            <RequireRole role="customer">
              <CustomerNewBookingPage />
            </RequireRole>
          }
        />
        <Route
          path="/customer/bookings"
          element={
            <RequireRole role="customer">
              <CustomerBookingsPage />
            </RequireRole>
          }
        />
        <Route
          path="/staff/dashboard"
          element={
            <RequireRole role="staff">
              <StaffDashboardPage />
            </RequireRole>
          }
        />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
