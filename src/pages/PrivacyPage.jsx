import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { clearUserData, clearAllData } from '../services/storage'

function PrivacyPage() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  
  const clearMyBookings = () => {
    if (!window.confirm('This will delete all YOUR bookings. Continue?')) return
    clearUserData()
    window.location.reload()
  }

  const clearEverything = () => {
    if (!window.confirm('⚠️ WARNING: This deletes ALL user accounts and data from this browser. This cannot be undone. Continue?')) return
    clearAllData()
    logout()
    navigate('/')
  }
  
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
      marginTop: '2rem',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    dangerButton: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1rem',
      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
      transition: 'all 0.3s ease',
      marginRight: '1rem',
    },
    warningButton: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1rem',
      boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
      transition: 'all 0.3s ease',
      marginRight: '1rem',
    },
  };

  return (
    <section>
      <div style={styles.pageHeader}>
        <h1 style={styles.title}>🔒 Privacy & Data</h1>
        <p style={styles.subtitle}>Your data, your control</p>
      </div>
      
      <div className="card" style={{ maxWidth: 720, margin: '0 auto' }}>
        <h2 style={styles.sectionTitle}>📦 How we store data</h2>
        <p>
          CleanEasy uses a <strong>fake Firebase authentication system</strong> that stores each user's data separately.
          When you log in with an email, your account and bookings are saved to that email.
          Logging in again with the same email will restore all your bookings.
        </p>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Account-based storage:</strong> Each email address has its own separate data</li>
          <li><strong>Personal details:</strong> name, email, phone (stored per account)</li>
          <li><strong>Booking history:</strong> service type, date, time, address, notes, status</li>
          <li><strong>Persistent sessions:</strong> Your data persists even after logging out</li>
        </ul>
        
        {currentUser && (
          <div style={{ background: 'rgba(102, 126, 234, 0.1)', padding: '1rem', borderRadius: '12px', marginTop: '1rem' }}>
            <p style={{ margin: 0, fontWeight: '600' }}>👤 Currently logged in as: <strong>{currentUser.email}</strong></p>
          </div>
        )}
        
        <h2 style={{ ...styles.sectionTitle, color: '#f59e0b' }}>
          🧹 Clear my bookings
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Delete only YOUR bookings. Your account will remain, but all your booking history will be cleared.
        </p>
        <button
          style={styles.warningButton}
          onClick={clearMyBookings}
          disabled={!currentUser}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 25px rgba(245, 158, 11, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.4)';
          }}
        >
          <span>Clear My Bookings</span>
        </button>
        
        <h2 style={{ ...styles.sectionTitle, color: '#ef4444' }}>
          🗑️ Delete ALL accounts & data
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          ⚠️ <strong>DANGER ZONE:</strong> This will delete ALL user accounts and their bookings from this browser.
          This is useful for resetting the entire demo system.
        </p>
        <button
          style={styles.dangerButton}
          onClick={clearEverything}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 25px rgba(239, 68, 68, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.4)';
          }}
        >
          <span>Delete Everything</span>
        </button>
      </div>
    </section>
  )
}

export default PrivacyPage
