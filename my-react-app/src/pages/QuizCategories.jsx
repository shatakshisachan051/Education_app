import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/config';

const subjects = [
  { id: 'math', name: 'Mathematics', icon: '🧮', color: '#4299e1' },
  { id: 'science', name: 'Science', icon: '🔬', color: '#48bb78' },
  { id: 'history', name: 'History', icon: '📜', color: '#ed8936' },
  { id: 'geography', name: 'Geography', icon: '🌍', color: '#9f7aea' },
  { id: 'english', name: 'English', icon: '📚', color: '#f56565' },
  { id: 'physics', name: 'Physics', icon: '⚛️', color: '#4299e1' },
  { id: 'computer', name: 'Computer Science', icon: '💻', color: '#48bb78' },
  { id: 'literature', name: 'Literature', icon: '📖', color: '#ed8936' },
  { id: 'art', name: 'Art', icon: '🎨', color: '#9f7aea' },
  { id: 'music', name: 'Music', icon: '🎵', color: '#f56565' }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.8
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

export function QuizCategories() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);

  useEffect(() => {
    // Simulate loading time for better animation effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = subjects.filter(subject =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSubjects(filtered);
  }, [searchQuery]);

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
          🎯
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <input
          type="text"
          placeholder="Search subjects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: '1px solid #e2e8f0',
            fontSize: '1rem',
            width: '250px',
            outline: 'none',
            transition: 'border-color 0.2s',
            ':focus': {
              borderColor: '#4299e1'
            }
          }}
        />
        <span style={{ color: '#718096' }}>🔍</span>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          fontSize: '2rem', 
          color: '#2d3748',
          marginBottom: '2rem',
          textAlign: 'center'
        }}
      >
        Choose a Subject
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          padding: '1rem'
        }}
      >
        {filteredSubjects.map((subject) => (
          <motion.div
            key={subject.id}
            variants={item}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/dashboard/quiz/${subject.id}`)}
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              border: `2px solid ${subject.color}`,
              transition: 'transform 0.2s'
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2
              }}
              style={{ 
                fontSize: '3rem',
                marginBottom: '1rem'
              }}
            >
              {subject.icon}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ 
                fontSize: '1.5rem', 
                color: subject.color,
                margin: 0,
                textAlign: 'center'
              }}
            >
              {subject.name}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ 
                color: '#718096',
                textAlign: 'center',
                margin: 0
              }}
            >
              Test your knowledge in {subject.name.toLowerCase()}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 