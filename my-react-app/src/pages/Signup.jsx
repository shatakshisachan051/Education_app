import { useState } from 'react';
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
  
  // Enables user creation and subsequent navigation to dashboard
  const { signup } = useAuth();
  const navigate = useNavigate();

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
        maxWidth: '450px', 
        margin: '2rem auto', 
        padding: '3rem 3rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Clearly indicates the purpose of the page to new users */}
        <h1 style={{ 
          marginBottom: '2.5rem', 
          textAlign: 'center',
          color: '#1a365d',
          fontSize: '2rem',
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
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        {/* Structures the registration process for optimal completion */}
        <form onSubmit={handleSubmit} style={{ 
          maxWidth: '320px', 
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          {/* Collects essential user identification information */}
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

          {/* Ensures secure password creation with proper input masking */}
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

          {/* Verifies password accuracy to prevent user errors */}
          <div style={{ marginBottom: '2rem' }}>
            <label
              htmlFor="confirm-password"
              style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#4a5568',
                fontWeight: '500',
                fontSize: '0.95rem'
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          {/* Initiates the account creation process with clear feedback */}
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        {/* Offers existing users a quick way to access the login page */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          color: '#4a5568'
        }}>
          <p>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#3182ce',
                textDecoration: 'none',
                fontWeight: '600',
                ':hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
} 