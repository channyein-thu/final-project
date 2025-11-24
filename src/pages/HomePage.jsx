import { Link } from 'react-router-dom'

function HomePage() {
  const styles = {
    container: {
      textAlign: 'center',
      marginTop: '4rem',
      position: 'relative',
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    hero: {
      maxWidth: 700,
      margin: '0 auto',
      padding: '3rem 2rem',
    },
    badge: {
      marginBottom: '1.5rem',
      display: 'inline-block',
    },
    title: {
      fontSize: '3.5rem',
      marginBottom: '1.5rem',
      fontWeight: '800',
      letterSpacing: '-0.02em',
      lineHeight: '1.2',
    },
    subtitle: {
      fontSize: '1.25rem',
      color: 'rgba(255, 255, 255, 0.95)',
      marginBottom: '2.5rem',
      fontWeight: '500',
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      maxWidth: 600,
      margin: '0 auto 2.5rem',
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    primaryBtn: {
      padding: '1rem 2.5rem',
      fontSize: '1.1rem',
      fontWeight: '700',
      borderRadius: '16px',
    },
    floatingOrbs: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none',
    },
    orb: {
      position: 'absolute',
      borderRadius: '50%',
      filter: 'blur(60px)',
      opacity: 0.3,
    },
    orb1: {
      width: '300px',
      height: '300px',
      background: 'rgba(102, 126, 234, 0.4)',
      top: '10%',
      left: '10%',
      animation: 'float 8s ease-in-out infinite',
    },
    orb2: {
      width: '250px',
      height: '250px',
      background: 'rgba(118, 75, 162, 0.4)',
      bottom: '20%',
      right: '15%',
      animation: 'float 10s ease-in-out infinite 2s',
    },
    orb3: {
      width: '200px',
      height: '200px',
      background: 'rgba(240, 147, 251, 0.4)',
      top: '50%',
      right: '5%',
      animation: 'float 12s ease-in-out infinite 4s',
    },
    content: {
      position: 'relative',
      zIndex: 1,
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginTop: '3rem',
      maxWidth: '900px',
      margin: '3rem auto 0',
    },
    feature: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '1.5rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s ease',
    },
    featureIcon: {
      fontSize: '2.5rem',
      marginBottom: '0.75rem',
    },
    featureTitle: {
      fontSize: '1.1rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: '#1e293b',
    },
    featureText: {
      fontSize: '0.95rem',
      color: '#64748b',
      lineHeight: '1.5',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.floatingOrbs}>
        <div style={{ ...styles.orb, ...styles.orb1 }}></div>
        <div style={{ ...styles.orb, ...styles.orb2 }}></div>
        <div style={{ ...styles.orb, ...styles.orb3 }}></div>
      </div>
      <div style={styles.content}>
        <div style={styles.hero}>
          <p className="status-badge status-confirmed" style={styles.badge}>
            ✨ Trusted by busy households
          </p>
          <h1 style={styles.title}>
            Book a home cleaning in minutes
          </h1>
          <p style={styles.subtitle}>
            CleanEasy keeps customers and cleaners on the same page. Schedule, track,
            and complete bookings without juggling chats or spreadsheets.
          </p>
          <div style={styles.buttonContainer}>
            <Link to="/login">
              <button className="btn-primary" style={styles.primaryBtn}>
                <span>Get Started →</span>
              </button>
            </Link>
            <Link to="/privacy">
              <button className="btn-secondary" style={styles.primaryBtn}>
                View Privacy Policy
              </button>
            </Link>
          </div>
        </div>
        <div style={styles.features}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🏠</div>
            <div style={styles.featureTitle}>Flexible Booking</div>
            <div style={styles.featureText}>Schedule cleanings on your terms, anytime</div>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>⚡</div>
            <div style={styles.featureTitle}>Instant Updates</div>
            <div style={styles.featureText}>Real-time status tracking for peace of mind</div>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🔒</div>
            <div style={styles.featureTitle}>Privacy First</div>
            <div style={styles.featureText}>Your data stays in your browser, always</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
