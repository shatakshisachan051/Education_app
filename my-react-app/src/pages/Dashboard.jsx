import { Navbar } from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export function Dashboard() {
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
        marginLeft: '200px',
        padding: '2rem',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <Outlet />
      </main>
    </div>
  );
} 