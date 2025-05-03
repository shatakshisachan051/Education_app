import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { Quiz } from './Quiz';
import { Leaderboard } from './Leaderboard';

export function Dashboard() {
  const { currentUser, logout } = useAuth();
  const { earnedBadges, points, quizHistory } = useProgress();

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Welcome, {currentUser?.email}</h1>
          <div style={{ marginTop: '0.5rem' }}>
            <p style={{ fontSize: '1.2rem' }}>
              Points: <strong>{points}</strong>
            </p>
            <p style={{ fontSize: '1.2rem' }}>
              Quizzes Completed: <strong>{quizHistory.length}</strong>
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#f56565',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      {earnedBadges.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Your Badges</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {earnedBadges.map(badge => (
              <div
                key={badge.id}
                style={{
                  padding: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  textAlign: 'center',
                  minWidth: '150px',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {badge.icon}
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>{badge.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Take a Quiz</h2>
          <Quiz />
        </div>
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Leaderboard</h2>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
} 