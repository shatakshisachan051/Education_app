import { useState, useEffect } from 'react';
import { quizData } from '../data/quizData';
import { useProgress } from '../context/ProgressContext';

export function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const { addQuizResult } = useProgress();

  const currentQuestion = quizData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;

  // Start timer when quiz begins
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleAnswerSelect = (optionIndex) => {
    if (showFeedback) return;
    
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const endTime = Date.now();
      const quizTime = Math.floor((endTime - startTime) / 1000); // Convert to seconds
      setTimeTaken(quizTime);
      setQuizCompleted(true);
      addQuizResult(score / quizData.length, quizTime);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizCompleted(false);
    setStartTime(Date.now());
  };

  if (quizCompleted) {
    return (
      <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1.5rem', textAlign: 'center' }}>
        <h2>Quiz Completed!</h2>
        <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
          Your final score: {score} out of {quizData.length}
        </p>
        <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
          Time taken: {timeTaken} seconds
        </p>
        <button
          onClick={handleRestartQuiz}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Question {currentQuestionIndex + 1} of {quizData.length}
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
          {currentQuestion.questionText}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showFeedback}
            style={{
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: showFeedback
                ? index === currentQuestion.correctAnswer
                  ? '#48bb78'
                  : selectedAnswer === index
                  ? '#f56565'
                  : '#fff'
                : '#fff',
              color: showFeedback && (index === currentQuestion.correctAnswer || selectedAnswer === index)
                ? 'white'
                : 'black',
              cursor: showFeedback ? 'default' : 'pointer',
              textAlign: 'left',
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem' }}>
            {selectedAnswer === currentQuestion.correctAnswer
              ? 'Correct! 🎉'
              : 'Incorrect. Try again next time!'}
          </p>
          <button
            onClick={handleNextQuestion}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
} 