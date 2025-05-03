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
        <div style={{ fontSize: '1.5rem', color: '#4a5568' }}>
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
        <div style={{ fontSize: '1.5rem', color: '#e53e3e' }}>
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
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Learning Progress'
      }
    }
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem' 
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        color: '#2d3748',
        marginBottom: '2rem'
      }}>
        Progress Dashboard
      </h1>

      {subjects.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#4a5568',
            marginBottom: '1rem'
          }}>
            No progress data yet! 🎯
          </p>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#718096'
          }}>
            Take some quizzes to start tracking your progress!
          </p>
        </div>
      ) : (
        <>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                color: '#2d3748',
                marginBottom: '1rem'
              }}>
                Total Score
              </h2>
              <div style={{ 
                fontSize: '3rem', 
                color: '#4299e1',
                fontWeight: 'bold'
              }}>
                {totalScore}
              </div>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                color: '#2d3748',
                marginBottom: '1rem'
              }}>
                Subjects Completed
              </h2>
              <div style={{ 
                fontSize: '3rem', 
                color: '#48bb78',
                fontWeight: 'bold'
              }}>
                {subjects.length}
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              height: '400px'
            }}>
              <Line data={lineChartData} options={chartOptions} />
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              height: '400px'
            }}>
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            height: '400px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <Doughnut data={doughnutChartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
} 