import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

// Centralizes user authentication to maintain consistent session management across the app
export function Login() {
  // Manages form state to prevent uncontrolled inputs and enable real-time validation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Provides access to authentication methods and navigation capabilities
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handles authentication flow to ensure secure user access and proper error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
    setLoading(false);
  };

  // Creates a visually appealing and accessible authentication interface
  return (
    // Provides a consistent background that reduces eye strain and improves readability
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, Helvetica, sans-serif',
      background: 'linear-gradient(135deg, #f6f9fc 0%, #eef2f7 100%)'
    }}>
      <Navbar />
      {/* Creates a focused, card-like container that draws attention to the login form */}
      <main style={{ 
        maxWidth: isMobile ? '100%' : '450px', 
        margin: isMobile ? '1rem auto' : '2rem auto', 
        padding: isMobile ? '2rem 1.5rem' : '3rem 3rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: isMobile ? '90%' : 'auto'
      }}>
        {/* Establishes clear hierarchy and welcomes users to the platform */}
        <h1 style={{ 
          marginBottom: isMobile ? '2rem' : '2.5rem', 
          textAlign: 'center',
          color: '#1a365d',
          fontSize: isMobile ? '1.75rem' : '2rem',
          fontWeight: 'bold'
        }}>Welcome Back</h1>
        
        {/* Provides immediate feedback for authentication errors to improve user experience */}
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

        {/* Organizes form elements for optimal user interaction and accessibility */}
        <form onSubmit={handleSubmit} style={{ 
          maxWidth: isMobile ? '100%' : '320px', 
          margin: '0 auto',
          padding: isMobile ? '0' : '0 1rem'
        }}>
          {/* Email field with clear labeling for better form completion */}
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

          {/* Password field with security considerations */}
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
              placeholder="Enter your password"
            />
          </div>

          {/* Submit button with loading state for better UX */}
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
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Registration link for new users */}
          <div style={{
            textAlign: 'center',
            fontSize: isMobile ? '0.875rem' : '0.9rem',
            color: '#64748b'
          }}>
            Don't have an account?{' '}
            <Link
              to="/signup"
              style={{
                color: '#3182ce',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Sign up here
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
} 