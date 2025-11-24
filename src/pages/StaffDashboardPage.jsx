import { useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { listAllBookings, updateBookingStatus } from '../services/storage'

const FILTERS = ['all', 'pending', 'confirmed', 'completed', 'cancelled']

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
  filterBar: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '1.5rem',
  },
  filterButton: {
    padding: '0.6rem 1.5rem',
    borderRadius: '12px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.9)',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    fontSize: '0.95rem',
    color: '#475569',
  },
  filterButtonActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: '2px solid transparent',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
};

function StaffDashboardPage() {
  const { currentUser } = useAuth()
  const [filter, setFilter] = useState('all')
  const [version, setVersion] = useState(0)
  const bookings = useMemo(() => listAllBookings(), [version])

  if (!currentUser || currentUser.role !== 'staff') {
    return null
  }

  const filtered = bookings.filter((booking) =>
    filter === 'all' ? true : booking.status === filter,
  )

  const refresh = () => setVersion((v) => v + 1)

  const changeStatus = (id, status) => {
    updateBookingStatus(id, status)
    refresh()
  }

  const getFilterIcon = (f) => {
    if (f === 'all') return '📊';
    if (f === 'pending') return '⏳';
    if (f === 'confirmed') return '✓';
    if (f === 'completed') return '✅';
    if (f === 'cancelled') return '❌';
    return '';
  };

  return (
    <section>
      <div style={styles.pageHeader}>
        <h1 style={styles.title}>👨‍💼 Staff Dashboard</h1>
        <p style={styles.subtitle}>Welcome, {currentUser.name}</p>
      </div>
      
      <div className="card" style={styles.filterBar}>
        {FILTERS.map((label) => (
          <button
            key={label}
            style={{
              ...styles.filterButton,
              ...(filter === label ? styles.filterButtonActive : {}),
            }}
            onClick={() => setFilter(label)}
          >
            {getFilterIcon(label)} <span style={{ textTransform: 'capitalize' }}>{label}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.1rem', color: '#64748b' }}>No bookings for this filter.</p>
        </div>
      ) : (
        filtered.map((booking) => (
          <article key={booking.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{booking.serviceTypeId}</strong>
              <span className={`status-badge status-${booking.status}`}>
                {booking.status}
              </span>
            </div>
            <p>
              {booking.date} at {booking.time}
            </p>
            <p>
              Customer: {booking.customerName} ({booking.customerPhone})
            </p>
            <p>Address: {booking.address}</p>
            {booking.status === 'pending' && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-primary" onClick={() => changeStatus(booking.id, 'confirmed')}>
                  Confirm
                </button>
                <button className="btn-secondary" onClick={() => changeStatus(booking.id, 'cancelled')}>
                  Cancel
                </button>
              </div>
            )}
            {booking.status === 'confirmed' && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-primary" onClick={() => changeStatus(booking.id, 'completed')}>
                  Mark Completed
                </button>
                <button className="btn-secondary" onClick={() => changeStatus(booking.id, 'cancelled')}>
                  Cancel
                </button>
              </div>
            )}
          </article>
        ))
      )}
    </section>
  )
}

export default StaffDashboardPage
