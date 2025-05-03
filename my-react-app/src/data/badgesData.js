export const badgesData = [
  {
    id: 'first_attempt',
    name: 'First Attempt',
    description: 'Complete your first quiz',
    criteria: (quizHistory) => quizHistory.length >= 1,
    icon: '🏆'
  },
  {
    id: 'quiz_whiz',
    name: 'Quiz Whiz',
    description: 'Score 80% or higher on a quiz',
    criteria: (quizHistory) => quizHistory.some(quiz => quiz.score >= 0.8),
    icon: '🌟'
  },
  {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Get all questions correct in a quiz',
    criteria: (quizHistory) => quizHistory.some(quiz => quiz.score === 1),
    icon: '💯'
  },
  {
    id: 'persistent_learner',
    name: 'Persistent Learner',
    description: 'Complete 3 quizzes',
    criteria: (quizHistory) => quizHistory.length >= 3,
    icon: '📚'
  },
  {
    id: 'quick_learner',
    name: 'Quick Learner',
    description: 'Complete a quiz in under 2 minutes',
    criteria: (quizHistory) => quizHistory.some(quiz => quiz.timeTaken < 120),
    icon: '⚡'
  }
]; 