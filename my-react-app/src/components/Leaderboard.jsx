import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTopUsers, getUserRank } from '../firebase/database';

export function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchLeaderboardData() {
      try {
        const [topUsersData, rank] = await Promise.all([
          getTopUsers(),
          getUserRank(currentUser.uid)
        ]);
        setTopUsers(topUsersData);
        setUserRank(rank);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboardData();
  }, [currentUser.uid]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading leaderboard...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Leaderboard</h2>
      
      {userRank && (
        <div style={{ 
          backgroundColor: '#f0f9ff',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.1rem' }}>
            Your current rank: <strong>#{userRank}</strong>
          </p>
        </div>
      )}

      <div style={{ 
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          padding: '0.75rem 1rem',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #ddd',
          fontWeight: 'bold'
        }}>
          <div style={{ width: '40px' }}>Rank</div>
          <div>User</div>
          <div style={{ textAlign: 'right' }}>Points</div>
        </div>

        {topUsers.map((user, index) => (
          <div
            key={user.id}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              padding: '0.75rem 1rem',
              borderBottom: '1px solid #ddd',
              backgroundColor: user.id === currentUser.uid ? '#f0f9ff' : 'white'
            }}
          >
            <div style={{ width: '40px', fontWeight: 'bold' }}>#{index + 1}</div>
            <div>{user.displayName || user.email?.split('@')[0] || 'Anonymous'}</div>
            <div style={{ textAlign: 'right' }}>{user.points}</div>
          </div>
        ))}

        {topUsers.length === 0 && (
          <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
            No users on the leaderboard yet. Be the first!
          </div>
        )}
      </div>
    </div>
  );
} 