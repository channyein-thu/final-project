import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import {
  createBooking,
  getServiceTypes,
  seedDefaultServiceTypes,
} from "../services/storage";

function CustomerNewBookingPage() {
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
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    serviceTypeId: "",
    date: "",
    time: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    seedDefaultServiceTypes();
    const svc = getServiceTypes();
    setServices(svc);
    setForm((prev) => ({ ...prev, serviceTypeId: svc[0]?.id ?? "" }));
  }, []);

  if (!currentUser || currentUser.role !== "customer") {
    return null;
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { serviceTypeId, date, time, address } = form;
    if (!serviceTypeId || !date || !time || !address) {
      alert("Please complete all required fields");
      return;
    }

    createBooking(form, currentUser);
    alert("Booking created!");
    navigate("/customer/bookings");
  };

  return (
    <section className="card" style={{ maxWidth: 700 }}>
      <h2>Request a Cleaning</h2>
      <form className="form-grid" onSubmit={onSubmit}>
        <label className="label">
          Service type
          <select
            name="serviceTypeId"
            value={form.serviceTypeId}
            onChange={onChange}
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} — ${service.basePrice}
              </option>
            ))}
          </select>
        </label>
        <label className="label">
          Date
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
          />
        </label>
        <label className="label">
          Time
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={onChange}
          />
        </label>
        <label className="label">
          Address
          <textarea
            name="address"
            value={form.address}
            onChange={onChange}
            rows={3}
          />
        </label>
        <label className="label">
          Notes (optional)
          <textarea
            name="notes"
            value={form.notes}
            onChange={onChange}
            rows={3}
          />
        </label>
        <button className="btn-primary" type="submit">
          Submit Booking
        </button>
      </form>
    </section>
  );
}

export default CustomerNewBookingPage;
