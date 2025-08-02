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
  { id: 'music', name: 'Music', icon: '��', color: '#f56565' },
  { id: 'chemistry', name: 'Chemistry', icon: '🧪', color: '#38b2ac' },
  { id: 'biology', name: 'Biology', icon: '🧬', color: '#68d391' },
  { id: 'economics', name: 'Economics', icon: '💰', color: '#f6ad55' },
  { id: 'psychology', name: 'Psychology', icon: '🧠', color: '#9f7aea' },
  { id: 'philosophy', name: 'Philosophy', icon: '🤔', color: '#4fd1c7' }
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
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery]);

  // Pagination logic
  const itemsPerPage = isMobile ? 5 : 10;
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubjects = filteredSubjects.slice(startIndex, endIndex);

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
          🎯
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: isMobile ? '1rem' : '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? '2rem' : '3rem'
      }}>
        <h1 style={{
          fontSize: isMobile ? '2rem' : '2.5rem',
          color: '#1e293b',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          Choose Your Subject
        </h1>
        <p style={{
          fontSize: isMobile ? '1rem' : '1.125rem',
          color: '#64748b',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Select a subject to start your learning journey
        </p>
      </div>

      {/* Search Bar */}
      <div style={{
        marginBottom: isMobile ? '2rem' : '3rem',
        maxWidth: '500px',
        margin: '0 auto 2rem'
      }}>
        <input
          type="text"
          placeholder="Search subjects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: isMobile ? '0.875rem' : '1rem',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Results Info */}
      <div style={{
        textAlign: 'center',
        marginBottom: '1rem',
        color: '#64748b',
        fontSize: isMobile ? '0.875rem' : '1rem'
      }}>
        Showing {startIndex + 1}-{Math.min(endIndex, filteredSubjects.length)} of {filteredSubjects.length} subjects
      </div>

      {/* Subjects Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: isMobile ? '1rem' : '2rem',
          padding: isMobile ? '0' : '0 1rem',
          marginBottom: isMobile ? '2rem' : '3rem'
        }}
      >
        {currentSubjects.map((subject) => (
          <motion.div
            key={subject.id}
            variants={item}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/dashboard/quiz/${subject.id}`)}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: isMobile ? '1.5rem' : '2rem',
              cursor: 'pointer',
              border: '2px solid transparent',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              minHeight: isMobile ? '150px' : '200px',
              justifyContent: 'center'
            }}
          >
            <div style={{
              fontSize: isMobile ? '2.5rem' : '3rem',
              marginBottom: isMobile ? '0.75rem' : '1rem'
            }}>
              {subject.icon}
            </div>
            <h3 style={{
              fontSize: isMobile ? '1.125rem' : '1.25rem',
              color: '#1e293b',
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              {subject.name}
            </h3>
            <div style={{
              width: '40px',
              height: '4px',
              background: subject.color,
              borderRadius: '2px',
              marginTop: '0.5rem'
            }} />
          </motion.div>
        ))}
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

      {/* Empty State */}
      {filteredSubjects.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: isMobile ? '3rem 1rem' : '4rem 2rem',
          color: '#64748b'
        }}>
          <div style={{
            fontSize: isMobile ? '3rem' : '4rem',
            marginBottom: '1rem'
          }}>
            🔍
          </div>
          <h3 style={{
            fontSize: isMobile ? '1.25rem' : '1.5rem',
            color: '#1e293b',
            marginBottom: '0.5rem'
          }}>
            No subjects found
          </h3>
          <p style={{
            fontSize: isMobile ? '0.875rem' : '1rem'
          }}>
            Try adjusting your search terms
          </p>
        </div>
      )}
    </div>
  );
} 