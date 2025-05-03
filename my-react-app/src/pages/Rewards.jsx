import { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';

const badgeDescriptions = {
  'quiz_master': 'Complete 10 quizzes with perfect scores',
  'fast_learner': 'Complete 5 quizzes in one day',
  'knowledge_seeker': 'Complete your first quiz',
  'achiever': 'Score above 80% in 3 consecutive quizzes',
  'explorer': 'Complete quizzes in 3 different categories'
};

export function Rewards() {
  const { userProgress } = useProgress();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Loading rewards...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Your Rewards</h1>
      
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Badges</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          {Object.entries(badgeDescriptions).map(([badgeId, description]) => {
            const hasBadge = userProgress.badges.includes(badgeId);
            
            return (
              <div
                key={badgeId}
                style={{
                  padding: '1.5rem',
                  backgroundColor: hasBadge ? '#ebf8ff' : '#f8f9fa',
                  borderRadius: '8px',
                  textAlign: 'center',
                  opacity: hasBadge ? 1 : 0.5
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1rem',
                  backgroundColor: hasBadge ? '#3182ce' : '#ddd',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem'
                }}>
                  {badgeId.charAt(0).toUpperCase()}
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>
                  {badgeId.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </h3>
                <p style={{ color: '#666', fontSize: '0.875rem' }}>
                  {description}
                </p>
                {!hasBadge && (
                  <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.75rem' }}>
                    Not earned yet
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Achievements</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ marginBottom: '0.5rem', color: '#666' }}>Total Points</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {userProgress.score}
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem', color: '#666' }}>Badges Earned</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {userProgress.badges.length} / {Object.keys(badgeDescriptions).length}
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem', color: '#666' }}>Current Level</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {Math.floor(userProgress.score / 100) + 1}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 