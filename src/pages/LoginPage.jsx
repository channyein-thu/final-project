import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    opacity: 0.9,
    zIndex: 0,
  },
  floatingOrbs: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
  orb1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
    top: '-200px',
    right: '-100px',
    animation: 'float 8s ease-in-out infinite',
  },
  orb2: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
    bottom: '-150px',
    left: '-50px',
    animation: 'float 6s ease-in-out infinite reverse',
  },
  orb3: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'float 10s ease-in-out infinite',
  },
  card: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '480px',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '3rem 2.5rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '0.95rem',
  },
  form: {
    display: 'grid',
    gap: '1.5rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  labelText: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#475569',
  },
  input: {
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    background: 'white',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  select: {
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    background: 'white',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    marginTop: '0.5rem',
  },
}

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('') // Clear error when user types
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please enter email and password')
      return
    }

    const result = login(form.email, form.password)
    if (result.error) {
      setError(result.error)
      return
    }

    if (redirectTo) {
      navigate(redirectTo, { replace: true })
      return
    }
    navigate(result.user.role === 'customer' ? '/customer/new-booking' : '/staff/dashboard')
  }

  const useDemoAccount = (email, password) => {
    const result = login(email, password)
    if (!result.error) {
      navigate(result.user.role === 'customer' ? '/customer/new-booking' : '/staff/dashboard')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.backgroundGradient}></div>
      <div style={styles.floatingOrbs}>
        <div style={styles.orb1}></div>
        <div style={styles.orb2}></div>
        <div style={styles.orb3}></div>
      </div>
      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.title}>Welcome back ✨</h2>
          <p style={styles.subtitle}>Sign in to access your account</p>
        </div>
        <form onSubmit={onSubmit} style={styles.form}>
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#dc2626',
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}>
              ⚠️ {error}
            </div>
          )}
          
          <label style={styles.label}>
            <span style={styles.labelText}>Email Address</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              style={styles.input}
              placeholder="you@example.com"
            />
          </label>
          
          <label style={styles.label}>
            <span style={styles.labelText}>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              required
              style={styles.input}
              placeholder="Enter your password"
            />
          </label>
          
          <button type="submit" style={styles.button}>
            <span>Login →</span>
          </button>
          
          <div style={{
            position: 'relative',
            textAlign: 'center',
            margin: '1.5rem 0 1rem',
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
            }}></div>
            <span style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '0 1rem',
              color: '#64748b',
              fontSize: '0.9rem',
              position: 'relative',
              zIndex: 1,
            }}>or try a demo account</span>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}>
            <button
              type="button"
              onClick={() => useDemoAccount('customer@demo.com', 'demo123')}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#475569',
                padding: '0.75rem',
                border: '2px solid rgba(102, 126, 234, 0.3)',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#667eea';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🛍️ Demo Customer
            </button>
            <button
              type="button"
              onClick={() => useDemoAccount('staff@demo.com', 'demo123')}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#475569',
                padding: '0.75rem',
                border: '2px solid rgba(102, 126, 234, 0.3)',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#667eea';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              👨‍💼 Demo Staff
            </button>
          </div>
          
          <div style={{
            textAlign: 'center',
            marginTop: '1rem',
            color: '#475569',
            fontSize: '0.95rem',
          }}>
            Don't have an account?{' '}
            <a href="/signup" style={{
              color: '#667eea',
              fontWeight: '600',
              textDecoration: 'none',
            }}>
              Sign up here
            </a>
          </div>
        </form>
      </section>
    </div>
  )
}

export default LoginPage
