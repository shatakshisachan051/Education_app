import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from '../components/Navbar';

const heroImage = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1022&q=80";

const carouselItems = [
  {
    title: "Interactive Learning Experience",
    description: "Engage with our cutting-edge learning platform that adapts to your pace and style. Experience personalized quizzes, real-time feedback, and progress tracking.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    buttonText: "Start Learning"
  },
  {
    title: "Smart Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and insights. Visualize your progress, identify strengths, and get personalized recommendations.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    buttonText: "View Progress"
  },
  {
    title: "Global Learning Community",
    description: "Join a vibrant community of learners worldwide. Share knowledge, compete in challenges, and climb the global leaderboard.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1184&q=80",
    buttonText: "Join Community"
  }
];

export function Home() {
  const [currentCarousel, setCurrentCarousel] = useState(0);
  const navigate = useNavigate();

  const nextCarousel = () => {
    setCurrentCarousel((prev) => (prev + 1) % carouselItems.length);
  };

  const prevCarousel = () => {
    setCurrentCarousel((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleActionClick = () => {
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, Helvetica, sans-serif'
    }}>
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <img 
                src="https://www.clipartmax.com/png/small/176-1761370_clinical-educators-education-flat-icon-png.png" 
                alt="Education Icon"
                style={{
                  width: '32px',
                  height: '32px',
                  objectFit: 'contain'
                }}
              />
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1e293b'
              }}>
                GamifyEd
              </span>
            </div>
            <div style={{
              display: 'flex',
              gap: '1.5rem'
            }}>
              <Link to="/" style={{
                color: '#1e293b',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1rem'
              }}>
                Home
              </Link>
              <Link to="/about" style={{
                color: '#1e293b',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1rem'
              }}>
                About
              </Link>
              <Link to="/contact" style={{
                color: '#1e293b',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1rem'
              }}>
                Contact
              </Link>
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <Link to="/login" style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: 'transparent',
              color: '#1e293b',
              border: '1px solid #1e293b',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.875rem',
              textDecoration: 'none'
            }}>
              Login
            </Link>
            <Link to="/signup" style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: '#1e293b',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.875rem',
              textDecoration: 'none'
            }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <main style={{
        flex: 1,
        marginTop: '0'
      }}>
        {/* Hero Section */}
        <div style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '0 2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              marginBottom: '1.25rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Welcome to GamifyEd
            </h1>
            <p style={{
              fontSize: '1.25rem',
              marginBottom: '1.5rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>
              Where Knowledge Meets Challenge
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleActionClick}
              style={{
                padding: '0.75rem 2.5rem',
                fontSize: '1.25rem',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: '500',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
              }}
            >
              Explore Now
            </motion.button>
          </motion.div>
        </div>

        {/* Interactive Carousel Section */}
        <div style={{
          padding: '6rem 2rem',
          background: 'white',
          position: 'relative'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr',
              gap: '4rem',
              alignItems: 'center',
              '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr'
              }
            }}>
              {/* Left Column - Content */}
              <motion.div
                key={currentCarousel}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                style={{
                  maxWidth: '400px'
                }}
              >
                <h2 style={{
                  fontSize: '2.25rem',
                  color: '#1e293b',
                  fontWeight: 'bold',
                  marginBottom: '1.25rem',
                  lineHeight: '1.2'
                }}>
                  {carouselItems[currentCarousel].title}
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#475569',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  {carouselItems[currentCarousel].description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleActionClick}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '1.1rem',
                    backgroundColor: '#1e293b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {carouselItems[currentCarousel].buttonText}
                </motion.button>
              </motion.div>

              {/* Right Column - Carousel */}
              <div style={{
                position: 'relative',
                height: '500px',
                '@media (max-width: 768px)': {
                  height: '400px'
                }
              }}>
                <div style={{
                  display: 'flex',
                  gap: '0.25rem',
                  height: '100%',
                  alignItems: 'center',
                  padding: '0 1rem'
                }}>
                  {/* Navigation Arrows */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevCarousel}
                    style={{
                      position: 'absolute',
                      left: '0',
                      background: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '3rem',
                      height: '3rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      zIndex: 2
                    }}
                  >
                    ←
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextCarousel}
                    style={{
                      position: 'absolute',
                      right: '0',
                      background: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '3rem',
                      height: '3rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      zIndex: 2
                    }}
                  >
                    →
                  </motion.button>

                  {/* Carousel Images */}
                  <AnimatePresence mode="wait">
                    {carouselItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ 
                          scale: index === currentCarousel ? 1 : 0.5,
                          x: index === currentCarousel ? 0 : 20
                        }}
                        animate={{ 
                          scale: index === currentCarousel ? 1 : 0.5,
                          x: index === currentCarousel ? 0 : 20
                        }}
                        exit={{ x: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={() => setCurrentCarousel(index)}
                        style={{
                          flex: index === currentCarousel ? 5 : 1,
                          height: '100%',
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          transition: 'all 0.3s ease',
                          opacity: 1
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          padding: '6rem 2rem',
          background: '#f8fafc',
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              fontWeight: 'bold'
            }}>
              Ready to Begin Your Learning Journey?
            </h2>
            <p style={{
              fontSize: '1.25rem',
              marginBottom: '2rem',
              opacity: 0.9
            }}>
              Join thousands of students who are enhancing their knowledge with our platform
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleActionClick}
              style={{
                padding: '1rem 3rem',
                fontSize: '1.25rem',
                backgroundColor: 'white',
                color: '#1e293b',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: '500',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
              }}
            >
              Start Learning Now
            </motion.button>
          </motion.div>
        </div>
      </main>

      <footer style={{
        background: '#1e293b',
        color: 'white',
        padding: '2rem',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: '#e2e8f0'
            }}>
              GamifyEd
            </h3>
            <p style={{
              color: '#94a3b8',
              lineHeight: '1.6'
            }}>
              Empowering students through interactive learning and knowledge assessment.
            </p>
          </div>
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              marginBottom: '1rem',
              color: '#e2e8f0'
            }}>
              Quick Links
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              color: '#94a3b8'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>About Us</li>
              <li style={{ marginBottom: '0.5rem' }}>Contact</li>
              <li style={{ marginBottom: '0.5rem' }}>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              marginBottom: '1rem',
              color: '#e2e8f0'
            }}>
              Connect With Us
            </h3>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <a href="#" style={{ color: '#94a3b8' }}>Twitter</a>
              <a href="#" style={{ color: '#94a3b8' }}>LinkedIn</a>
              <a href="#" style={{ color: '#94a3b8' }}>Instagram</a>
            </div>
          </div>
        </div>
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid #334155',
          color: '#94a3b8'
        }}>
          © 2025 GamifyEd. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 