import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ref, get, set } from 'firebase/database';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const badges = {
  beginner: {
    name: 'Beginner',
    description: 'Completed first quiz',
    icon: '🎯',
    threshold: 1
  },
  intermediate: {
    name: 'Intermediate',
    description: 'Scored above 70% in any subject',
    icon: '🏆',
    threshold: 0.7
  },
  expert: {
    name: 'Expert',
    description: 'Scored above 90% in any subject',
    icon: '🌟',
    threshold: 0.9
  },
  allRounder: {
    name: 'All-Rounder',
    description: 'Completed quizzes in all subjects',
    icon: '🎖️',
    threshold: 5
  }
};

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
    y: 20
  },
  show: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

const subjectMapping = {
  'mathematic': 'math',
  'mathematics': 'math',
  'english': 'english',
  'science': 'science',
  'history': 'history',
  'geography': 'geography'
};

export function Scores() {
  const { currentUser } = useAuth();
  const [scores, setScores] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      if (!currentUser) {
        console.log('No current user found');
        setLoading(false);
        return;
      }

      try {
        console.log('Current user:', currentUser.uid);
        const scoresRef = ref(db, `users/${currentUser.uid}/scores`);
        console.log('Scores reference path:', scoresRef.toString());
        console.log('Database URL:', db.app.options.databaseURL);

        console.log('Attempting to fetch scores...');
        const snapshot = await get(scoresRef);
        console.log('Snapshot received:', snapshot.exists() ? 'Data exists' : 'No data');
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('Scores data:', data);
          setScores(data);
          
          // Calculate total score
          const total = Object.values(data).reduce((sum, score) => sum + score.score, 0);
          console.log('Total score calculated:', total);
          setTotalScore(total);
          
          // Check for badges
          const earnedBadges = Object.entries(badges)
            .filter(([_, { threshold }]) => total >= threshold)
            .map(([name]) => name);
          console.log('Earned badges:', earnedBadges);
          setEarnedBadges(earnedBadges);
        } else {
          console.log('No scores data found in database');
          setScores({});
          setTotalScore(0);
          setEarnedBadges([]);
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
        setError('Failed to load scores. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [currentUser]);

  const handleRestart = async () => {
    if (!currentUser) return;

    try {
      console.log('Resetting scores for user:', currentUser.uid);
      const scoresRef = ref(db, `users/${currentUser.uid}/scores`);
      
      // Reset scores in database
      await set(scoresRef, {});
      console.log('Scores reset successfully');
      
      // Reset local state
      setScores({});
      setTotalScore(0);
      setEarnedBadges([]);
    } catch (error) {
      console.error('Error resetting scores:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
    }
  };

  const handleSubjectClick = (subject) => {
    const normalizedSubject = subjectMapping[subject.toLowerCase()] || subject.toLowerCase();
    navigate(`/dashboard/quiz/${normalizedSubject}`);
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ 
            fontSize: '1.5rem', 
            color: '#4a5568' 
          }}
        >
          Loading scores...
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem' 
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}
      >
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#2d3748',
          fontWeight: 'bold'
        }}>
          Your Scores
        </h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRestart}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#f56565',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'background-color 0.2s'
          }}
        >
          Restart Progress
        </motion.button>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}
      >
        <motion.div
          variants={item}
          style={{ 
            backgroundColor: 'white', 
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          <h2 style={{ 
            fontSize: '1.5rem', 
            color: '#2d3748',
            marginBottom: '1rem'
          }}>
            Total Score
          </h2>
          <div style={{ 
            fontSize: '3.5rem', 
            color: '#4299e1',
            fontWeight: 'bold'
          }}>
            {totalScore}
          </div>
        </motion.div>

        <motion.div
          variants={item}
          style={{ 
            backgroundColor: 'white', 
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          <h2 style={{ 
            fontSize: '1.5rem', 
            color: '#2d3748',
            marginBottom: '1rem'
          }}>
            Subjects Completed
          </h2>
          <div style={{ 
            fontSize: '3.5rem', 
            color: '#48bb78',
            fontWeight: 'bold'
          }}>
            {Object.keys(scores).length}
          </div>
        </motion.div>
      </motion.div>

      {earnedBadges.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ 
            backgroundColor: 'white', 
            borderRadius: '1rem', 
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          <h2 style={{ 
            fontSize: '1.5rem', 
            color: '#2d3748',
            marginBottom: '1.5rem'
          }}>
            Your Badges
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {earnedBadges.map((badge, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.02 }}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem' 
                }}>
                  {badges[badge].icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  color: '#2d3748',
                  marginBottom: '0.5rem'
                }}>
                  {badges[badge].name}
                </h3>
                <p style={{ 
                  color: '#718096',
                  fontSize: '0.875rem'
                }}>
                  {badges[badge].description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {Object.keys(scores).length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ 
            backgroundColor: 'white', 
            borderRadius: '1rem', 
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          <h2 style={{ 
            fontSize: '1.5rem', 
            color: '#2d3748',
            marginBottom: '2rem'
          }}>
            Subject-wise Scores
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '2rem',
            justifyContent: 'center'
          }}>
            {Object.entries(scores).map(([subject, data]) => (
              <motion.div
                key={subject}
                variants={item}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleSubjectClick(subject)}
                style={{
                  width: '250px',
                  height: '250px',
                  padding: '1.5rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #e2e8f0',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  ':hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <div>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    color: '#2d3748',
                    margin: 0,
                    marginBottom: '1rem'
                  }}>
                    {subjectMapping[subject.toLowerCase()] || subject.charAt(0).toUpperCase() + subject.slice(1)}
                  </h3>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.5rem'
                  }}>
                    <span style={{ 
                      fontSize: '2.5rem', 
                      color: '#4299e1',
                      fontWeight: 'bold',
                      lineHeight: 1
                    }}>
                      {data.score || 0}
                    </span>
                    <span style={{ 
                      color: '#718096',
                      fontSize: '1rem'
                    }}>
                      points
                    </span>
                  </div>
                </div>
                <p style={{ 
                  color: '#718096',
                  fontSize: '0.875rem',
                  margin: 0,
                  textAlign: 'right'
                }}>
                  Last attempt: {new Date(data.timestamp).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
} 