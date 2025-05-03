import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { badgesData } from '../data/badgesData';
import { updateLeaderboardEntry } from '../firebase/database';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [quizHistory, setQuizHistory] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [points, setPoints] = useState(0);
  const { currentUser } = useAuth();

  // Calculate points based on quiz performance
  const calculatePoints = (score, timeTaken) => {
    const basePoints = Math.floor(score * 100); // 100 points per quiz
    const timeBonus = timeTaken < 120 ? 50 : 0; // 50 bonus points for quick completion
    return basePoints + timeBonus;
  };

  // Add a completed quiz to history and update points
  const addQuizResult = async (score, timeTaken) => {
    const newPoints = calculatePoints(score, timeTaken);
    const updatedPoints = points + newPoints;
    setPoints(updatedPoints);
    
    const newQuiz = {
      score,
      timeTaken,
      timestamp: new Date().toISOString()
    };
    
    setQuizHistory(prev => [...prev, newQuiz]);

    // Update leaderboard
    if (currentUser) {
      try {
        await updateLeaderboardEntry(currentUser.uid, {
          displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Anonymous',
          email: currentUser.email,
          points: updatedPoints,
          quizzesCompleted: quizHistory.length + 1
        });
      } catch (error) {
        console.error('Error updating leaderboard:', error);
      }
    }
  };

  // Check for new badges whenever quiz history changes
  useEffect(() => {
    const newBadges = badgesData.filter(badge => {
      const hasBadge = earnedBadges.some(earned => earned.id === badge.id);
      const meetsCriteria = badge.criteria(quizHistory);
      return !hasBadge && meetsCriteria;
    });

    if (newBadges.length > 0) {
      setEarnedBadges(prev => [...prev, ...newBadges]);
    }
  }, [quizHistory, earnedBadges]);

  return (
    <ProgressContext.Provider value={{
      quizHistory,
      earnedBadges,
      points,
      addQuizResult
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
} 