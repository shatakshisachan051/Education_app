import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/config';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  show: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export function Leaderboard() {
  const { currentUser } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!currentUser) {
        setError('Please sign in to view the leaderboard');
        setLoading(false);
        return;
      }

      try {
        // Get leaderboard data
        const leaderboardRef = ref(db, 'leaderboard');
        const leaderboardSnapshot = await get(leaderboardRef);
        
        console.log('Raw leaderboard data:', leaderboardSnapshot.val());
        
        if (leaderboardSnapshot.exists()) {
          const leaderboardData = leaderboardSnapshot.val();
          
          // Create a map to store unique users with their highest scores
          const uniqueUsers = new Map();
          
          // Process each entry
          Object.entries(leaderboardData).forEach(([uid, data]) => {
            console.log('Processing entry:', { uid, data });
            
            // Skip entries with undefined or null scores
            if (data.totalScore === undefined || data.totalScore === null) {
              console.log('Skipping entry with invalid score:', uid);
              return;
            }

            // Only add/update if the score is valid
            if (!uniqueUsers.has(uid) || data.totalScore > uniqueUsers.get(uid).totalScore) {
              console.log('Adding/updating user:', uid, 'with score:', data.totalScore);
              uniqueUsers.set(uid, {
                uid,
                email: data.email || 'Anonymous',
                totalScore: data.totalScore || 0,
                subjectsCompleted: data.subjectsCompleted || 0
              });
            } else {
              console.log('Skipping user:', uid, 'as they have a lower score');
            }
          });

          console.log('Unique users after processing:', Array.from(uniqueUsers.values()));
          
          // Convert to array and sort by total score
          const leaderboard = Array.from(uniqueUsers.values())
            .filter(user => user.totalScore > 0) // Only show users with scores
            .sort((a, b) => b.totalScore - a.totalScore);

          console.log('Final sorted leaderboard:', leaderboard);
          
          setLeaderboardData(leaderboard);
        } else {
          console.log('No leaderboard data found');
          setLeaderboardData([]);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        if (error.message.includes('Permission denied')) {
          setError('You do not have permission to view the leaderboard. Please contact the administrator.');
        } else {
          setError('Failed to load leaderboard data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [currentUser]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ 
            fontSize: '3rem',
            color: '#4299e1'
          }}
        >
          🏆
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ 
          fontSize: '1.5rem', 
          color: '#e53e3e',
          textAlign: 'center',
          padding: '1rem'
        }}>
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem' 
    }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          fontSize: '2.5rem', 
          color: '#2d3748',
          marginBottom: '2rem',
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        Leaderboard
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '2rem',
          marginBottom: '2rem'
        }}
      >
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: '1rem',
          padding: '1rem',
          borderBottom: '2px solid #e2e8f0',
          marginBottom: '1rem',
          fontWeight: 'bold',
          color: '#4a5568'
        }}>
          <div style={{ width: '50px', textAlign: 'center' }}>Rank</div>
          <div>User</div>
          <div style={{ width: '100px', textAlign: 'right' }}>Total Score</div>
        </div>

        {leaderboardData.map((user, index) => (
          <motion.div
            key={user.uid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '1rem',
              padding: '1rem',
              borderBottom: '1px solid #e2e8f0',
              backgroundColor: user.uid === currentUser?.uid ? '#ebf8ff' : 'transparent',
              borderRadius: '0.5rem',
              transition: 'background-color 0.2s'
            }}
          >
            <div style={{ 
              width: '50px',
              textAlign: 'center',
              fontWeight: 'bold',
              color: index < 3 ? '#d69e2e' : '#4a5568',
              fontSize: index < 3 ? '1.2rem' : '1rem'
            }}>
              #{index + 1}
            </div>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{ 
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: '#4a5568'
              }}>
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ 
                  fontWeight: 'bold',
                  color: '#2d3748'
                }}>
                  {user.email}
                </div>
                <div style={{ 
                  fontSize: '0.875rem',
                  color: '#718096'
                }}>
                  {user.subjectsCompleted} subjects completed
                </div>
              </div>
            </div>
            <div style={{ 
              width: '100px',
              textAlign: 'right',
              fontWeight: 'bold',
              color: '#4299e1',
              fontSize: '1.2rem'
            }}>
              {user.totalScore}
            </div>
          </motion.div>
        ))}

        {leaderboardData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              textAlign: 'center',
              padding: '2rem',
              color: '#718096'
            }}
          >
            No scores yet! Be the first to take a quiz and appear on the leaderboard.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 