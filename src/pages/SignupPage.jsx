import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '2.5rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
    maxWidth: '480px',
    width: '100%',
    position: 'relative',
    zIndex: 2,
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  labelText: {
    fontWeight: '600',
    color: '#475569',
    fontSize: '0.95rem',
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

function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  })
  const [error, setError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('') // Clear error when user types
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError('Please fill out all fields')
      return
    }
    
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const result = signup(form.email, form.password, form.name, form.phone, form.role)
    if (result.error) {
      setError(result.error)
      return
    }

    navigate(result.user.role === 'customer' ? '/customer/new-booking' : '/staff/dashboard')
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
          <h2 style={styles.title}>Create Account ✨</h2>
          <p style={styles.subtitle}>Sign up to start booking cleaning services</p>
        </div>
        <form onSubmit={onSubmit} style={styles.form}>
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#dc2626',
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}>
              ⚠️ {error}
            </div>
          )}
          
          <label style={styles.label}>
            <span style={styles.labelText}>Full Name</span>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              style={styles.input}
              placeholder="Enter your full name"
            />
          </label>
          
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
            <span style={styles.labelText}>Phone Number</span>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              required
              style={styles.input}
              placeholder="+1 (555) 000-0000"
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
              placeholder="At least 6 characters"
            />
          </label>
          
          <label style={styles.label}>
            <span style={styles.labelText}>Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              required
              style={styles.input}
              placeholder="Re-enter your password"
            />
          </label>
          
          <label style={styles.label}>
            <span style={styles.labelText}>I am a...</span>
            <select name="role" value={form.role} onChange={onChange} style={styles.select}>
              <option value="customer">🛍️ Customer - Book cleaning services</option>
              <option value="staff">👨‍💼 Staff - Manage bookings</option>
            </select>
          </label>
          
          <button type="submit" style={styles.button}>
            <span>Create Account →</span>
          </button>
          
          <div style={{
            textAlign: 'center',
            marginTop: '0.5rem',
            color: '#475569',
            fontSize: '0.95rem',
          }}>
            Already have an account?{' '}
            <a href="/login" style={{
              color: '#667eea',
              fontWeight: '600',
              textDecoration: 'none',
            }}>
              Login here
            </a>
          </div>
        </form>
      </section>
    </div>
  )
}

export default SignupPage
