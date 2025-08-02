import { Navbar } from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, Helvetica, sans-serif'
    }}>
      <Navbar isDashboard />
      <main style={{
        flex: 1,
        marginLeft: isMobile ? '0' : '200px',
        marginTop: isMobile ? '80px' : '0',
        padding: isMobile ? '1rem' : '2rem',
        minHeight: isMobile ? 'calc(100vh - 80px)' : '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <Outlet />
      </main>
    </div>
  );
} 