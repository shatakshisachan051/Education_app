import { useState } from 'react';
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
  
  // Provides access to authentication methods and navigation capabilities
  const { login } = useAuth();
  const navigate = useNavigate();

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
        maxWidth: '450px', 
        margin: '2rem auto', 
        padding: '3rem 3rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Establishes clear hierarchy and welcomes users to the platform */}
        <h1 style={{ 
          marginBottom: '2.5rem', 
          textAlign: 'center',
          color: '#1a365d',
          fontSize: '2rem',
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
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        {/* Organizes form elements for optimal user interaction and accessibility */}
        <form onSubmit={handleSubmit} style={{ 
          maxWidth: '320px', 
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          {/* Email field with clear labeling for better form completion */}
          <div style={{ marginBottom: '2rem' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#4a5568',
                fontWeight: '500',
                fontSize: '0.95rem'
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
                width: 'auto',
                padding: '1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                ':focus': {
                  outline: 'none',
                  borderColor: '#4299e1',
                  boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)'
                }
              }}
            />
          </div>

          {/* Password field with security considerations and clear visual feedback */}
          <div style={{ marginBottom: '2rem' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#4a5568',
                fontWeight: '500',
                fontSize: '0.95rem'
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
                width: 'auto',
                padding: '1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                ':focus': {
                  outline: 'none',
                  borderColor: '#4299e1',
                  boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)'
                }
              }}
            />
          </div>

          {/* Primary action button with clear visual hierarchy and loading state */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              opacity: loading ? 0.7 : 1,
              transition: 'background-color 0.2s',
              ':hover': {
                backgroundColor: '#2c5282'
              }
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Provides clear navigation to registration for new users */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          color: '#4a5568'
        }}>
          <p>
            Don't have an account?{' '}
            <Link
              to="/signup"
              style={{
                color: '#3182ce',
                textDecoration: 'none',
                fontWeight: '600',
                ':hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
} 