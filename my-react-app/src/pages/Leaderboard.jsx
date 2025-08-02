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
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  // Pagination logic
  const itemsPerPage = isMobile ? 5 : 10;
  const totalPages = Math.ceil(leaderboardData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLeaderboardData = leaderboardData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            fontSize: isMobile ? '2rem' : '3rem',
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
        gap: '1rem',
        padding: isMobile ? '1rem' : '2rem'
      }}>
        <div style={{ 
          fontSize: isMobile ? '1.25rem' : '1.5rem', 
          color: '#e53e3e',
          textAlign: 'center',
          padding: '1rem'
        }}>
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: isMobile ? '0.75rem 1.5rem' : '0.5rem 1rem',
            backgroundColor: '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: isMobile ? '0.875rem' : '1rem'
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
      padding: isMobile ? '1rem' : '2rem' 
    }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          fontSize: isMobile ? '2rem' : '2.5rem', 
          color: '#2d3748',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        Leaderboard
      </motion.h1>

      {/* Results Info */}
      {leaderboardData.length > 0 && (
        <div style={{
          textAlign: 'center',
          marginBottom: '1rem',
          color: '#64748b',
          fontSize: isMobile ? '0.875rem' : '1rem'
        }}>
          Showing {startIndex + 1}-{Math.min(endIndex, leaderboardData.length)} of {leaderboardData.length} participants
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: isMobile ? '1rem' : '2rem',
          marginBottom: '2rem',
          overflow: 'hidden'
        }}
      >
        {/* Header Row */}
        <div style={{ 
          display: isMobile ? 'none' : 'grid',
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

        {/* Leaderboard Items */}
        {currentLeaderboardData.map((user, index) => (
          <motion.div
            key={user.uid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            style={{
              display: isMobile ? 'flex' : 'grid',
              flexDirection: isMobile ? 'column' : 'unset',
              gridTemplateColumns: isMobile ? 'unset' : 'auto 1fr auto',
              gap: isMobile ? '0.75rem' : '1rem',
              padding: isMobile ? '1rem 0.75rem' : '1rem',
              borderBottom: '1px solid #e2e8f0',
              backgroundColor: user.uid === currentUser?.uid ? '#ebf8ff' : 'transparent',
              borderRadius: '0.5rem',
              transition: 'background-color 0.2s'
            }}
          >
            {/* Rank */}
            <div style={{ 
              width: isMobile ? 'auto' : '50px',
              textAlign: isMobile ? 'left' : 'center',
              fontWeight: 'bold',
              color: (startIndex + index) < 3 ? '#d69e2e' : '#4a5568',
              fontSize: isMobile ? '1rem' : ((startIndex + index) < 3 ? '1.2rem' : '1rem'),
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '0.5rem' : '0'
            }}>
              {isMobile && (
                <span style={{
                  fontSize: (startIndex + index) < 3 ? '1.5rem' : '1.25rem'
                }}>
                  {(startIndex + index) === 0 ? '🥇' : (startIndex + index) === 1 ? '🥈' : (startIndex + index) === 2 ? '🥉' : '#'}
                </span>
              )}
              {isMobile ? `Rank ${startIndex + index + 1}` : `#${startIndex + index + 1}`}
            </div>

            {/* User Info */}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flex: isMobile ? '1' : 'unset'
            }}>
              <div style={{ 
                width: isMobile ? '35px' : '40px',
                height: isMobile ? '35px' : '40px',
                borderRadius: '50%',
                backgroundColor: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: '#4a5568',
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}>
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div style={{
                flex: isMobile ? '1' : 'unset',
                minWidth: isMobile ? '0' : 'unset'
              }}>
                <div style={{ 
                  fontWeight: 'bold',
                  color: '#2d3748',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {user.email}
                </div>
                <div style={{ 
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  color: '#718096'
                }}>
                  {user.subjectsCompleted} subjects completed
                </div>
              </div>
            </div>

            {/* Score */}
            <div style={{ 
              width: isMobile ? 'auto' : '100px',
              textAlign: isMobile ? 'right' : 'right',
              fontWeight: 'bold',
              color: '#4299e1',
              fontSize: isMobile ? '1rem' : '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMobile ? 'flex-end' : 'flex-end'
            }}>
              {user.totalScore} pts
            </div>
          </motion.div>
        ))}

        {leaderboardData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              textAlign: 'center',
              padding: isMobile ? '2rem 1rem' : '2rem',
              color: '#718096',
              fontSize: isMobile ? '0.875rem' : '1rem'
            }}
          >
            No scores yet! Be the first to take a quiz and appear on the leaderboard.
          </motion.div>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? '0.5rem' : '1rem',
          marginTop: '2rem',
          flexWrap: 'wrap'
        }}>
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
              border: '1px solid #e2e8f0',
              backgroundColor: currentPage === 1 ? '#f1f5f9' : 'white',
              color: currentPage === 1 ? '#94a3b8' : '#374151',
              borderRadius: '8px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: isMobile ? '0.875rem' : '1rem',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                padding: isMobile ? '0.5rem 0.75rem' : '0.75rem 1rem',
                border: '1px solid #e2e8f0',
                backgroundColor: currentPage === page ? '#3b82f6' : 'white',
                color: currentPage === page ? 'white' : '#374151',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: isMobile ? '0.875rem' : '1rem',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                minWidth: isMobile ? '2rem' : '2.5rem'
              }}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
              border: '1px solid #e2e8f0',
              backgroundColor: currentPage === totalPages ? '#f1f5f9' : 'white',
              color: currentPage === totalPages ? '#94a3b8' : '#374151',
              borderRadius: '8px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: isMobile ? '0.875rem' : '1rem',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 