import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, push, onValue, get } from 'firebase/database';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';

const quizData = {
  math: [
    {
      question: "What is the value of π (pi) to two decimal places?",
      options: ["3.14", "3.16", "3.12", "3.18"],
      correctAnswer: "3.14"
    },
    {
      question: "What is the square root of 144?",
      options: ["10", "11", "12", "13"],
      correctAnswer: "12"
    },
    {
      question: "What is 15% of 200?",
      options: ["20", "25", "30", "35"],
      correctAnswer: "30"
    },
    {
      question: "What is the next number in the sequence: 2, 4, 8, 16, ...?",
      options: ["24", "28", "32", "36"],
      correctAnswer: "32"
    },
    {
      question: "What is the area of a rectangle with length 8 and width 5?",
      options: ["13", "26", "35", "40"],
      correctAnswer: "40"
    }
  ],
  science: [
    {
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Au", "Fe", "Cu"],
      correctAnswer: "Au"
    },
    {
      question: "What is the pH value of pure water?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7"
    },
    {
      question: "Which gas makes up about 78% of Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: "Nitrogen"
    },
    {
      question: "What is the lightest element in the periodic table?",
      options: ["Helium", "Hydrogen", "Lithium", "Beryllium"],
      correctAnswer: "Hydrogen"
    },
    {
      question: "What is the chemical formula for table salt?",
      options: ["NaCl", "H2O", "CO2", "CH4"],
      correctAnswer: "NaCl"
    }
  ],
  english: [
    {
      question: "Which of these is a preposition?",
      options: ["Run", "Under", "Happy", "Quickly"],
      correctAnswer: "Under"
    },
    {
      question: "What is the past tense of 'go'?",
      options: ["Gone", "Going", "Went", "Goes"],
      correctAnswer: "Went"
    },
    {
      question: "Which word is an adjective?",
      options: ["Beautiful", "Beauty", "Beautify", "Beautifully"],
      correctAnswer: "Beautiful"
    },
    {
      question: "What is the plural of 'child'?",
      options: ["Childs", "Children", "Childes", "Child"],
      correctAnswer: "Children"
    },
    {
      question: "Which sentence is in the passive voice?",
      options: [
        "The cat chased the mouse",
        "The mouse was chased by the cat",
        "The cat is chasing the mouse",
        "The cat will chase the mouse"
      ],
      correctAnswer: "The mouse was chased by the cat"
    }
  ],
  history: [
    {
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
      correctAnswer: "George Washington"
    },
    {
      question: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      correctAnswer: "1945"
    },
    {
      question: "Who wrote the Declaration of Independence?",
      options: ["Benjamin Franklin", "Thomas Jefferson", "John Adams", "George Washington"],
      correctAnswer: "Thomas Jefferson"
    },
    {
      question: "What was the name of the ship that brought the Pilgrims to America?",
      options: ["Santa Maria", "Mayflower", "Nina", "Pinta"],
      correctAnswer: "Mayflower"
    },
    {
      question: "Who was the first woman to fly solo across the Atlantic Ocean?",
      options: ["Bessie Coleman", "Amelia Earhart", "Harriet Quimby", "Jacqueline Cochran"],
      correctAnswer: "Amelia Earhart"
    }
  ],
  geography: [
    {
      question: "What is the largest continent by area?",
      options: ["Africa", "North America", "Asia", "Europe"],
      correctAnswer: "Asia"
    },
    {
      question: "Which river is the longest in the world?",
      options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      correctAnswer: "Nile"
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      correctAnswer: "Canberra"
    },
    {
      question: "Which country has the most time zones?",
      options: ["Russia", "China", "United States", "Canada"],
      correctAnswer: "Russia"
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correctAnswer: "Pacific"
    }
  ],
  physics: [
    {
      question: "What is the SI unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: "Newton"
    },
    {
      question: "What is the speed of light in a vacuum?",
      options: ["300,000 km/s", "299,792 km/s", "250,000 km/s", "350,000 km/s"],
      correctAnswer: "299,792 km/s"
    },
    {
      question: "Which law states that every action has an equal and opposite reaction?",
      options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravity"],
      correctAnswer: "Newton's Third Law"
    },
    {
      question: "What is the unit of electrical resistance?",
      options: ["Volt", "Ampere", "Ohm", "Watt"],
      correctAnswer: "Ohm"
    },
    {
      question: "What is the formula for kinetic energy?",
      options: ["1/2 mv²", "mgh", "F=ma", "P=IV"],
      correctAnswer: "1/2 mv²"
    }
  ],
  computer: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
      ],
      correctAnswer: "Hyper Text Markup Language"
    },
    {
      question: "Which programming language is known as the 'mother of all languages'?",
      options: ["C", "Java", "Python", "Assembly"],
      correctAnswer: "C"
    },
    {
      question: "What is the binary equivalent of decimal 10?",
      options: ["1010", "1100", "1001", "1110"],
      correctAnswer: "1010"
    },
    {
      question: "Which data structure uses LIFO (Last In First Out) principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: "Stack"
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: "O(log n)"
    }
  ],
  literature: [
    {
      question: "Who wrote 'Pride and Prejudice'?",
      options: ["Jane Austen", "Charlotte Brontë", "Emily Brontë", "Charles Dickens"],
      correctAnswer: "Jane Austen"
    },
    {
      question: "Which Shakespeare play features the character 'Hamlet'?",
      options: ["Macbeth", "Othello", "Hamlet", "King Lear"],
      correctAnswer: "Hamlet"
    },
    {
      question: "Who is the author of '1984'?",
      options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
      correctAnswer: "George Orwell"
    },
    {
      question: "Which novel begins with 'It was the best of times, it was the worst of times'?",
      options: ["Great Expectations", "A Tale of Two Cities", "Oliver Twist", "David Copperfield"],
      correctAnswer: "A Tale of Two Cities"
    },
    {
      question: "Who wrote 'The Great Gatsby'?",
      options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"],
      correctAnswer: "F. Scott Fitzgerald"
    }
  ],
  art: [
    {
      question: "Who painted 'The Starry Night'?",
      options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dalí"],
      correctAnswer: "Vincent van Gogh"
    },
    {
      question: "Which art movement is known for its use of geometric shapes?",
      options: ["Cubism", "Impressionism", "Surrealism", "Expressionism"],
      correctAnswer: "Cubism"
    },
    {
      question: "Who sculpted 'David'?",
      options: ["Leonardo da Vinci", "Michelangelo", "Donatello", "Raphael"],
      correctAnswer: "Michelangelo"
    },
    {
      question: "Which artist is known for his 'Campbell's Soup Cans'?",
      options: ["Andy Warhol", "Roy Lichtenstein", "Jackson Pollock", "Mark Rothko"],
      correctAnswer: "Andy Warhol"
    },
    {
      question: "What is the primary color that is not a primary color in light?",
      options: ["Red", "Blue", "Yellow", "Green"],
      correctAnswer: "Yellow"
    }
  ],
  music: [
    {
      question: "Who composed 'Symphony No. 9'?",
      options: ["Mozart", "Beethoven", "Bach", "Tchaikovsky"],
      correctAnswer: "Beethoven"
    },
    {
      question: "How many strings does a standard guitar have?",
      options: ["4", "5", "6", "7"],
      correctAnswer: "6"
    },
    {
      question: "Which instrument is known as the 'king of instruments'?",
      options: ["Piano", "Violin", "Organ", "Flute"],
      correctAnswer: "Organ"
    },
    {
      question: "What is the Italian term for 'loud' in music?",
      options: ["Piano", "Forte", "Allegro", "Adagio"],
      correctAnswer: "Forte"
    },
    {
      question: "Which composer wrote 'The Four Seasons'?",
      options: ["Vivaldi", "Handel", "Mozart", "Haydn"],
      correctAnswer: "Vivaldi"
    }
  ]
};

export function Quiz() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Validate subject
    if (!subjectId || !quizData[subjectId]) {
      setError('Invalid quiz subject');
      setLoading(false);
      return;
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    const db = getDatabase();
    const leaderboardRef = ref(db, 'leaderboard');
    
    onValue(leaderboardRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const leaderboardArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setLeaderboardData(leaderboardArray);
      }
    });

    return () => clearTimeout(timer);
  }, [subjectId]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === quizData[subjectId][currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizData[subjectId].length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setShowScore(true);
      saveScore();
    }
  };

  const saveScore = async () => {
    if (!currentUser) {
      console.error('No user logged in');
      return;
    }

    try {
      console.log('Saving score for user:', currentUser.uid);
      console.log('Current score:', score);
      console.log('Subject ID:', subjectId);

      // Save to user's scores
      const userScoresRef = ref(db, `users/${currentUser.uid}/scores/${subjectId}`);
      const userScoreData = {
        score: score,
        timestamp: Date.now(),
        subject: subjectId,
        email: currentUser.email
      };
      console.log('Saving user score data:', userScoreData);
      await set(userScoresRef, userScoreData);

      // Get all user scores to calculate total
      const userScoresSnapshot = await get(ref(db, `users/${currentUser.uid}/scores`));
      console.log('User scores snapshot:', userScoresSnapshot.val());

      if (userScoresSnapshot.exists()) {
        const scores = userScoresSnapshot.val();
        const totalScore = Object.values(scores).reduce((sum, score) => sum + (score.score || 0), 0);
        const subjectsCompleted = Object.keys(scores).length;

        console.log('Calculated total score:', totalScore);
        console.log('Subjects completed:', subjectsCompleted);

        // Update leaderboard with unique user entry
        const leaderboardRef = ref(db, `leaderboard/${currentUser.uid}`);
        const leaderboardData = {
          email: currentUser.email,
          totalScore,
          subjectsCompleted,
          lastUpdated: Date.now()
        };
        console.log('Saving to leaderboard:', leaderboardData);
        await set(leaderboardRef, leaderboardData);
      }
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const handleLeaderboardClick = () => {
    navigate('/dashboard/leaderboard');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div style={{ 
          fontSize: '1.5rem', 
          color: '#4a5568' 
        }}>
          Loading quiz...
        </div>
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
        flexDirection: 'column'
      }}>
        <div style={{ 
          fontSize: '1.5rem', 
          color: '#e53e3e',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
        <button
          onClick={() => navigate('/dashboard/quiz')}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Back to Quiz Categories
        </button>
      </div>
    );
  }

  if (showScore) {
    return (
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '1rem',
          color: '#2d3748'
        }}>
          Quiz Completed!
        </h2>
        <p style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#4a5568'
        }}>
          Your score: {score} out of {quizData[subjectId].length}
        </p>
        <button
          onClick={handleLeaderboardClick}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          View Leaderboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem' 
    }}>
      <div style={{ 
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          color: '#2d3748',
          marginBottom: '0.5rem'
        }}>
          Question {currentQuestion + 1} of {quizData[subjectId].length}
        </h2>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#4a5568',
          marginBottom: '1rem'
        }}>
          {quizData[subjectId][currentQuestion].question}
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {quizData[subjectId][currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            disabled={selectedAnswer !== null}
            style={{
              padding: '1rem',
              fontSize: '1rem',
              backgroundColor: selectedAnswer === option
                ? isCorrect ? '#48bb78' : '#f56565'
                : '#edf2f7',
              color: selectedAnswer === option ? 'white' : '#2d3748',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: selectedAnswer === null ? 'pointer' : 'default',
              transition: 'background-color 0.2s'
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div style={{ 
          textAlign: 'center',
          marginTop: '1rem'
        }}>
          <p style={{ 
            fontSize: '1.25rem',
            color: isCorrect ? '#48bb78' : '#f56565',
            marginBottom: '1rem'
          }}>
            {isCorrect ? 'Correct! 🎉' : 'Incorrect. Try again next time!'}
          </p>
          <button
            onClick={handleNextQuestion}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#4299e1',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {currentQuestion + 1 === quizData[subjectId].length ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
} 