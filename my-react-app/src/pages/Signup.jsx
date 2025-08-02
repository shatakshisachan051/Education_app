import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

// Facilitates new user onboarding while maintaining security standards
export function Signup() {
  // Tracks form state to ensure data integrity and provide immediate validation feedback
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Enables user creation and subsequent navigation to dashboard
  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Implements secure account creation with proper validation and error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevents account creation with mismatched passwords
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    }
    setLoading(false);
  };

  // Presents a user-friendly registration interface with clear guidance
  return (
    // Maintains visual consistency with the login page for brand recognition
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, Helvetica, sans-serif',
      background: 'linear-gradient(135deg, #f6f9fc 0%, #eef2f7 100%)'
    }}>
      <Navbar />
      {/* Creates a distinct registration area with proper visual hierarchy */}
      <main style={{ 
        maxWidth: isMobile ? '100%' : '450px', 
        margin: isMobile ? '1rem auto' : '2rem auto', 
        padding: isMobile ? '2rem 1.5rem' : '3rem 3rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: isMobile ? '90%' : 'auto'
      }}>
        {/* Clearly indicates the purpose of the page to new users */}
        <h1 style={{ 
          marginBottom: isMobile ? '2rem' : '2.5rem', 
          textAlign: 'center',
          color: '#1a365d',
          fontSize: isMobile ? '1.75rem' : '2rem',
          fontWeight: 'bold'
        }}>Create Account</h1>
        
        {/* Provides immediate feedback for registration issues */}
        {error && (
          <div style={{
            backgroundColor: '#fff5f5',
            color: '#c53030',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            border: '1px solid #fed7d7',
            fontSize: isMobile ? '0.875rem' : '0.9rem'
          }}>
            {error}
          </div>
        )}

        {/* Structures the registration process for optimal completion */}
        <form onSubmit={handleSubmit} style={{ 
          maxWidth: isMobile ? '100%' : '320px', 
          margin: '0 auto',
          padding: isMobile ? '0' : '0 1rem'
        }}>
          {/* Collects essential user identification information */}
          <div style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#4a5568',
                fontWeight: '500',
                fontSize: isMobile ? '0.9rem' : '0.95rem'
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: isMobile ? '0.75rem' : '0.875rem',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: isMobile ? '0.875rem' : '1rem',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
            />
          </div>

          {/* Establishes secure password requirements */}
          <div style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#4a5568',
                fontWeight: '500',
                fontSize: isMobile ? '0.9rem' : '0.95rem'
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: isMobile ? '0.75rem' : '0.875rem',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: isMobile ? '0.875rem' : '1rem',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              placeholder="Create a password"
            />
          </div>

          {/* Confirms password accuracy to prevent user errors */}
          <div style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
            <label
              htmlFor="confirmPassword"
              style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#4a5568',
                fontWeight: '500',
                fontSize: isMobile ? '0.9rem' : '0.95rem'
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: isMobile ? '0.75rem' : '0.875rem',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: isMobile ? '0.875rem' : '1rem',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              placeholder="Confirm your password"
            />
          </div>

          {/* Initiates account creation with proper loading states */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: isMobile ? '0.875rem' : '1rem',
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: isMobile ? '0.9rem' : '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s ease',
              marginBottom: isMobile ? '1.5rem' : '2rem'
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Provides navigation to login for existing users */}
          <div style={{
            textAlign: 'center',
            fontSize: isMobile ? '0.875rem' : '0.9rem',
            color: '#64748b'
          }}>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#3182ce',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Sign in here
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
} 