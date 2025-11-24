import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import {
  listBookingsByCustomer,
  updateBookingStatus,
} from '../services/storage'

const styles = {
  pageHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.9)',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
};

function BookingSection({ title, bookings, onCancel }) {
  const icon = title.includes('Upcoming') ? '⏰' : '✅';
  
  return (
    <div className="card">
      <h3 style={styles.sectionTitle}>
        {icon} {title}
      </h3>
      {bookings.length === 0 ? (
        <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>No bookings here yet.</p>
      ) : (
        <div className="form-grid">
          {bookings.map((booking) => (
            <article key={booking.id} className="card" style={{ margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{booking.serviceTypeId}</strong>
                <span className={`status-badge status-${booking.status}`}>
                  {booking.status}
                </span>
              </div>
              <p>
                {booking.date} at {booking.time}
              </p>
              <p>{booking.address}</p>
              {booking.notes && <p>Notes: {booking.notes}</p>}
              {booking.status === 'pending' && (
                <button className="btn-secondary" onClick={() => onCancel(booking.id)}>
                  Cancel booking
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function CustomerBookingsPage() {
  const { currentUser } = useAuth()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    if (!currentUser) return
    setBookings(listBookingsByCustomer(currentUser.id))
  }, [currentUser])

  if (!currentUser || currentUser.role !== 'customer') {
    return null
  }

  const refresh = () => setBookings(listBookingsByCustomer(currentUser.id))

  const handleCancel = (bookingId) => {
    if (!window.confirm('Cancel this booking?')) return
    updateBookingStatus(bookingId, 'cancelled')
    refresh()
  }

  const upcoming = bookings.filter((b) => ['pending', 'confirmed'].includes(b.status))
  const past = bookings.filter((b) => ['completed', 'cancelled'].includes(b.status))

  return (
    <section>
      <div style={styles.pageHeader}>
        <h1 style={styles.title}>📋 My Bookings</h1>
        <p style={styles.subtitle}>Track and manage your cleaning appointments</p>
      </div>
      <BookingSection title="Upcoming" bookings={upcoming} onCancel={handleCancel} />
      <BookingSection title="Past" bookings={past} onCancel={handleCancel} />
    </section>
  )
}

export default CustomerBookingsPage
