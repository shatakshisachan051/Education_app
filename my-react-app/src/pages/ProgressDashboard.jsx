import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/config';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function ProgressDashboard() {
  const { currentUser } = useAuth();
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const scoresRef = ref(db, `users/${currentUser.uid}/scores`);
        const snapshot = await get(scoresRef);
        
        if (snapshot.exists()) {
          setScores(snapshot.val());
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
        setError('Failed to load progress data');
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [currentUser]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div style={{ 
          fontSize: isMobile ? '1.25rem' : '1.5rem', 
          color: '#4a5568',
          textAlign: 'center',
          padding: isMobile ? '1rem' : '2rem'
        }}>
          Loading progress data...
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
        height: '100vh' 
      }}>
        <div style={{ 
          fontSize: isMobile ? '1.25rem' : '1.5rem', 
          color: '#e53e3e',
          textAlign: 'center',
          padding: isMobile ? '1rem' : '2rem'
        }}>
          {error}
        </div>
      </div>
    );
  }

  const subjects = Object.keys(scores);
  const subjectScores = subjects.map(subject => scores[subject].score || 0);
  const totalScore = subjectScores.reduce((sum, score) => sum + score, 0);

  const lineChartData = {
    labels: subjects,
    datasets: [
      {
        label: 'Subject Scores',
        data: subjectScores,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      }
    ]
  };

  const barChartData = {
    labels: subjects,
    datasets: [
      {
        label: 'Subject-wise Performance',
        data: subjectScores,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }
    ]
  };

  const doughnutChartData = {
    labels: subjects,
    datasets: [
      {
        data: subjectScores,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'top',
        labels: {
          boxWidth: isMobile ? 12 : 20,
          padding: isMobile ? 8 : 15,
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      title: {
        display: true,
        text: 'Your Learning Progress',
        font: {
          size: isMobile ? 14 : 16
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      }
    }
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: isMobile ? '1rem' : '2rem',
      overflow: 'hidden'
    }}>
      <h1 style={{ 
        fontSize: isMobile ? '1.75rem' : '2rem', 
        color: '#2d3748',
        marginBottom: isMobile ? '1.5rem' : '2rem',
        textAlign: 'center'
      }}>
        Progress Dashboard
      </h1>

      {subjects.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: isMobile ? '1.5rem' : '2rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          margin: '0 auto',
          maxWidth: isMobile ? '100%' : '600px'
        }}>
          <p style={{ 
            fontSize: isMobile ? '1.1rem' : '1.2rem', 
            color: '#4a5568',
            marginBottom: '1rem'
          }}>
            No progress data yet! 🎯
          </p>
          <p style={{ 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            color: '#718096'
          }}>
            Take some quizzes to start tracking your progress!
          </p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: isMobile ? '1rem' : '2rem',
            marginBottom: isMobile ? '1.5rem' : '2rem'
          }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: isMobile ? '1rem' : '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h2 style={{ 
                fontSize: isMobile ? '1.25rem' : '1.5rem', 
                color: '#2d3748',
                marginBottom: '0.75rem'
              }}>
                Total Score
              </h2>
              <div style={{ 
                fontSize: isMobile ? '2.5rem' : '3rem', 
                color: '#4299e1',
                fontWeight: 'bold'
              }}>
                {totalScore}
              </div>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: isMobile ? '1rem' : '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h2 style={{ 
                fontSize: isMobile ? '1.25rem' : '1.5rem', 
                color: '#2d3748',
                marginBottom: '0.75rem'
              }}>
                Subjects Completed
              </h2>
              <div style={{ 
                fontSize: isMobile ? '2.5rem' : '3rem', 
                color: '#48bb78',
                fontWeight: 'bold'
              }}>
                {subjects.length}
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: isMobile ? '1.5rem' : '2rem',
            marginBottom: isMobile ? '1.5rem' : '2rem'
          }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: isMobile ? '1rem' : '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              height: isMobile ? '300px' : '400px',
              overflow: 'hidden'
            }}>
              <Line data={lineChartData} options={chartOptions} />
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: isMobile ? '1rem' : '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              height: isMobile ? '300px' : '400px',
              overflow: 'hidden'
            }}>
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>

          {/* Doughnut Chart */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: isMobile ? '1rem' : '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            height: isMobile ? '300px' : '400px',
            maxWidth: isMobile ? '100%' : '600px',
            margin: '0 auto',
            overflow: 'hidden'
          }}>
            <Doughnut data={doughnutChartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
} 