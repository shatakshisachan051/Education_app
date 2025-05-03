import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaTrophy, FaChartBar, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

export function Navbar({ isDashboard = false }) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isDashboard) {
    return (
      <nav style={{
        width: '200px',
        height: '100vh',
        backgroundColor: '#ffffff',
        padding: '1.5rem',
        position: 'fixed',
        left: 0,
        top: 0,
        borderRight: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <img 
            src="https://www.clipartmax.com/png/small/176-1761370_clinical-educators-education-flat-icon-png.png" 
            alt="Education Icon"
            style={{
              width: '28px',
              height: '28px',
              objectFit: 'contain'
            }}
          />
          <h3 style={{ 
            color: '#1e293b',
            fontSize: '1.25rem',
            margin: 0,
            fontWeight: 600
          }}>Dashboard</h3>
        </div>
        
        <div style={{ 
          marginBottom: '1.5rem',
          paddingLeft: '0.5rem'
        }}>
          <p style={{ 
            color: '#64748b',
            fontSize: '0.875rem',
            margin: 0,
            fontWeight: 500
          }}>{currentUser?.email}</p>
        </div>
        
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          margin: 0
        }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              to="/dashboard/quiz"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                color: location.pathname === '/dashboard/quiz' ? '#2563eb' : '#475569',
                textDecoration: 'none',
                borderRadius: '6px',
                backgroundColor: location.pathname === '/dashboard/quiz' ? '#eff6ff' : 'transparent',
                fontWeight: location.pathname === '/dashboard/quiz' ? 600 : 500,
                transition: 'all 0.2s ease'
              }}
            >
              <FaBook style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
              Quizzes
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              to="/dashboard/leaderboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                color: location.pathname === '/dashboard/leaderboard' ? '#2563eb' : '#475569',
                textDecoration: 'none',
                borderRadius: '6px',
                backgroundColor: location.pathname === '/dashboard/leaderboard' ? '#eff6ff' : 'transparent',
                fontWeight: location.pathname === '/dashboard/leaderboard' ? 600 : 500,
                transition: 'all 0.2s ease'
              }}
            >
              <FaTrophy style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
              Leaderboard
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              to="/dashboard/scores"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                color: location.pathname === '/dashboard/scores' ? '#2563eb' : '#475569',
                textDecoration: 'none',
                borderRadius: '6px',
                backgroundColor: location.pathname === '/dashboard/scores' ? '#eff6ff' : 'transparent',
                fontWeight: location.pathname === '/dashboard/scores' ? 600 : 500,
                transition: 'all 0.2s ease'
              }}
            >
              <FaChartBar style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
              Scores
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              to="/dashboard/progress"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                color: location.pathname === '/dashboard/progress' ? '#2563eb' : '#475569',
                textDecoration: 'none',
                borderRadius: '6px',
                backgroundColor: location.pathname === '/dashboard/progress' ? '#eff6ff' : 'transparent',
                fontWeight: location.pathname === '/dashboard/progress' ? 600 : 500,
                transition: 'all 0.2s ease'
              }}
            >
              <FaChartLine style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
              Progress Dashboard
            </Link>
          </li>
        </ul>

        <button
          onClick={handleLogout}
          style={{
            marginTop: '2rem',
            padding: '0.75rem',
            backgroundColor: '#f8fafc',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <FaSignOutAlt style={{ fontSize: '1.25rem' }} />
          Logout
        </button>
      </nav>
    );
  }

  return (
    <nav style={{
      backgroundColor: '#f8f9fa',
      padding: '1rem',
      borderBottom: '1px solid #ddd',
      marginBottom: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link
            to="/"
            style={{
              color: location.pathname === '/' ? '#3182ce' : '#333',
              textDecoration: 'none',
              fontWeight: location.pathname === '/' ? 'bold' : 'normal'
            }}
          >
            Home
          </Link>
          <Link
            to="/about"
            style={{
              color: location.pathname === '/about' ? '#3182ce' : '#333',
              textDecoration: 'none',
              fontWeight: location.pathname === '/about' ? 'bold' : 'normal'
            }}
          >
            About
          </Link>
          <Link
            to="/contact"
            style={{
              color: location.pathname === '/contact' ? '#3182ce' : '#333',
              textDecoration: 'none',
              fontWeight: location.pathname === '/contact' ? 'bold' : 'normal'
            }}
          >
            Contact
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {currentUser ? (
            <Link
              to="/dashboard"
              style={{
                color: '#3182ce',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  color: location.pathname === '/login' ? '#3182ce' : '#333',
                  textDecoration: 'none',
                  fontWeight: location.pathname === '/login' ? 'bold' : 'normal'
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                style={{
                  color: location.pathname === '/signup' ? '#3182ce' : '#333',
                  textDecoration: 'none',
                  fontWeight: location.pathname === '/signup' ? 'bold' : 'normal'
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 