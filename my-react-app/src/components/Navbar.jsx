import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaTrophy, FaChartBar, FaChartLine, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export function Navbar({ isDashboard = false }) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
        width: isMobile ? '100%' : '200px',
        height: isMobile ? 'auto' : '100vh',
        backgroundColor: '#ffffff',
        padding: isMobile ? '0.75rem' : '1.5rem',
        position: 'fixed',
        left: 0,
        top: 0,
        borderRight: isMobile ? 'none' : '1px solid #e2e8f0',
        borderBottom: isMobile ? '1px solid #e2e8f0' : 'none',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        maxWidth: isMobile ? '100vw' : '200px',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          marginBottom: isMobile ? '1rem' : '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'space-between' : 'flex-start',
          gap: '0.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #e2e8f0',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flex: isMobile ? '1' : 'unset',
            minWidth: 0
          }}>
            <img 
              src="https://www.clipartmax.com/png/small/176-1761370_clinical-educators-education-flat-icon-png.png" 
              alt="Education Icon"
              style={{
                width: isMobile ? '20px' : '28px',
                height: isMobile ? '20px' : '28px',
                objectFit: 'contain',
                flexShrink: 0
              }}
            />
            <h3 style={{ 
              color: '#1e293b',
              fontSize: isMobile ? '1rem' : '1.25rem',
              margin: 0,
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>Dashboard</h3>
          </div>
          
          {/* Mobile menu toggle for dashboard */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                fontSize: '1.25rem',
                color: '#64748b',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: '4px',
                minWidth: '28px',
                minHeight: '28px',
                flexShrink: 0
              }}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </div>
        
        <div style={{ 
          marginBottom: isMobile ? '1rem' : '1.5rem',
          paddingLeft: '0.5rem',
          display: isMobile ? (isMobileMenuOpen ? 'block' : 'none') : 'block'
        }}>
          <p style={{ 
            color: '#64748b',
            fontSize: '0.75rem',
            margin: 0,
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>{currentUser?.email}</p>
        </div>
        
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          margin: 0,
          display: isMobile ? (isMobileMenuOpen ? 'block' : 'none') : 'block'
        }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              to="/dashboard/quiz"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: isMobile ? '0.5rem' : '0.75rem',
                color: location.pathname === '/dashboard/quiz' ? '#2563eb' : '#475569',
                textDecoration: 'none',
                borderRadius: '6px',
                backgroundColor: location.pathname === '/dashboard/quiz' ? '#eff6ff' : 'transparent',
                fontWeight: location.pathname === '/dashboard/quiz' ? 600 : 500,
                transition: 'all 0.2s ease',
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}
            >
              <FaBook style={{ marginRight: '0.5rem', fontSize: isMobile ? '1rem' : '1.25rem', flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Quizzes</span>
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              to="/dashboard/leaderboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: isMobile ? '0.5rem' : '0.75rem',
                color: location.pathname === '/dashboard/leaderboard' ? '#2563eb' : '#475569',
                textDecoration: 'none',
                borderRadius: '6px',
                backgroundColor: location.pathname === '/dashboard/leaderboard' ? '#eff6ff' : 'transparent',
                fontWeight: location.pathname === '/dashboard/leaderboard' ? 600 : 500,
                transition: 'all 0.2s ease',
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}
            >
              <FaTrophy style={{ marginRight: '0.5rem', fontSize: isMobile ? '1rem' : '1.25rem', flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Leaderboard</span>
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              to="/dashboard/scores"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: isMobile ? '0.5rem' : '0.75rem',
                color: location.pathname === '/dashboard/scores' ? '#2563eb' : '#475569',
                textDecoration: 'none',
                borderRadius: '6px',
                backgroundColor: location.pathname === '/dashboard/scores' ? '#eff6ff' : 'transparent',
                fontWeight: location.pathname === '/dashboard/scores' ? 600 : 500,
                transition: 'all 0.2s ease',
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}
            >
              <FaChartBar style={{ marginRight: '0.5rem', fontSize: isMobile ? '1rem' : '1.25rem', flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Scores</span>
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              to="/dashboard/progress"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: isMobile ? '0.5rem' : '0.75rem',
                color: location.pathname === '/dashboard/progress' ? '#2563eb' : '#475569',
                textDecoration: 'none',
                borderRadius: '6px',
                backgroundColor: location.pathname === '/dashboard/progress' ? '#eff6ff' : 'transparent',
                fontWeight: location.pathname === '/dashboard/progress' ? 600 : 500,
                transition: 'all 0.2s ease',
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}
            >
              <FaChartLine style={{ marginRight: '0.5rem', fontSize: isMobile ? '1rem' : '1.25rem', flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Progress</span>
            </Link>
          </li>
        </ul>

        <button
          onClick={handleLogout}
          style={{
            marginTop: isMobile ? '1rem' : '2rem',
            padding: isMobile ? '0.5rem' : '0.75rem',
            backgroundColor: '#f8fafc',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            display: isMobile ? (isMobileMenuOpen ? 'flex' : 'none') : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: isMobile ? '0.875rem' : '1rem'
          }}
        >
          <FaSignOutAlt style={{ fontSize: isMobile ? '1rem' : '1.25rem', flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Logout</span>
        </button>
      </nav>
    );
  }

  return (
    <nav style={{
      backgroundColor: '#f8f9fa',
      padding: '1rem',
      borderBottom: '1px solid #ddd',
      marginBottom: '2rem',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile ? '0 0.5rem' : '0 2rem',
        gap: isMobile ? '0.5rem' : '1rem'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: isMobile ? '0.5rem' : '1rem',
          flexDirection: isMobile ? 'column' : 'row',
          flexWrap: 'wrap'
        }}>
          <Link
            to="/"
            style={{
              color: location.pathname === '/' ? '#3182ce' : '#333',
              textDecoration: 'none',
              fontWeight: location.pathname === '/' ? 'bold' : 'normal',
              fontSize: isMobile ? '0.75rem' : '1rem',
              whiteSpace: 'nowrap'
            }}
          >
            Home
          </Link>
          <Link
            to="/about"
            style={{
              color: location.pathname === '/about' ? '#3182ce' : '#333',
              textDecoration: 'none',
              fontWeight: location.pathname === '/about' ? 'bold' : 'normal',
              fontSize: isMobile ? '0.75rem' : '1rem',
              whiteSpace: 'nowrap'
            }}
          >
            About
          </Link>
          <Link
            to="/contact"
            style={{
              color: location.pathname === '/contact' ? '#3182ce' : '#333',
              textDecoration: 'none',
              fontWeight: location.pathname === '/contact' ? 'bold' : 'normal',
              fontSize: isMobile ? '0.75rem' : '1rem',
              whiteSpace: 'nowrap'
            }}
          >
            Contact
          </Link>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: isMobile ? '0.5rem' : '1rem',
          flexDirection: isMobile ? 'column' : 'row',
          flexWrap: 'wrap'
        }}>
          {currentUser ? (
            <Link
              to="/dashboard"
              style={{
                color: '#3182ce',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: isMobile ? '0.75rem' : '1rem',
                whiteSpace: 'nowrap'
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
                  fontWeight: location.pathname === '/login' ? 'bold' : 'normal',
                  fontSize: isMobile ? '0.75rem' : '1rem',
                  whiteSpace: 'nowrap'
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                style={{
                  color: location.pathname === '/signup' ? '#3182ce' : '#333',
                  textDecoration: 'none',
                  fontWeight: location.pathname === '/signup' ? 'bold' : 'normal',
                  fontSize: isMobile ? '0.75rem' : '1rem',
                  whiteSpace: 'nowrap'
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