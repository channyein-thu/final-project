import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import {
  updateBooking,
  getBookingById,
  getServiceTypes,
  seedDefaultServiceTypes,
} from "../services/storage";

function CustomerEditBookingPage() {
  const { bookingId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    serviceTypeId: "",
    date: "",
    time: "",
    address: "",
    notes: "",
  });

  const styles = {
    pageHeader: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "rgba(255, 255, 255, 0.9)",
      textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    },
  };

  useEffect(() => {
    seedDefaultServiceTypes();
    setServices(getServiceTypes());

    // Load existing booking
    const booking = getBookingById(bookingId);
    if (!booking) {
      alert("Booking not found");
      navigate("/customer/bookings");
      return;
    }

    // Check if user owns this booking
    if (booking.customerId !== currentUser?.id) {
      alert("You can only edit your own bookings");
      navigate("/customer/bookings");
      return;
    }

    // Check if booking is editable (only pending bookings)
    if (booking.status !== "pending") {
      alert("You can only edit pending bookings");
      navigate("/customer/bookings");
      return;
    }

    // Populate form with existing data
    setForm({
      serviceTypeId: booking.serviceTypeId,
      date: booking.date,
      time: booking.time,
      address: booking.address,
      notes: booking.notes || "",
    });

    setLoading(false);
  }, [bookingId, currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.serviceTypeId || !form.date || !form.time || !form.address) {
      alert("Please fill in all required fields");
      return;
    }

    const updated = updateBooking(bookingId, {
      serviceTypeId: form.serviceTypeId,
      date: form.date,
      time: form.time,
      address: form.address,
      notes: form.notes,
    });

    if (updated) {
      alert("Booking updated successfully!");
      navigate("/customer/bookings");
    } else {
      alert("Failed to update booking");
    }
  };

  if (loading) {
    return (
      <section>
        <div style={styles.pageHeader}>
          <h1 style={styles.title}>Loading...</h1>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div style={styles.pageHeader}>
        <h1 style={styles.title}>✏️ Edit Booking</h1>
        <p style={styles.subtitle}>Update your cleaning appointment details</p>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit} className="form-grid">
          <label className="label">
            <span>Service Type *</span>
            <select
              value={form.serviceTypeId}
              onChange={(e) =>
                setForm({ ...form, serviceTypeId: e.target.value })
              }
              required
            >
              <option value="">-- Select a service --</option>
              {services.map((svc) => (
                <option key={svc.id} value={svc.id}>
                  {svc.name} - ${svc.basePrice}
                </option>
              ))}
            </select>
          </label>

          <label className="label">
            <span>Date *</span>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </label>

          <label className="label">
            <span>Time *</span>
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              required
            />
          </label>

          <label className="label">
            <span>Address *</span>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
              rows={3}
              placeholder="Enter your full address"
            />
          </label>

          <label className="label">
            <span>Special Notes</span>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              placeholder="Any special instructions or requests"
            />
          </label>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              💾 Save Changes
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/customer/bookings")}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CustomerEditBookingPage;
