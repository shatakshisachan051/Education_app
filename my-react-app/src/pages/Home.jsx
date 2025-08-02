import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
          padding: isMobile ? '0.75rem 1rem' : '0.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1rem' : '0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '1rem' : '2rem',
            flexDirection: isMobile ? 'column' : 'row'
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
                  width: isMobile ? '28px' : '32px',
                  height: isMobile ? '28px' : '32px',
                  objectFit: 'contain'
                }}
              />
              <span style={{
                fontSize: isMobile ? '1.125rem' : '1.25rem',
                fontWeight: 'bold',
                color: '#1e293b'
              }}>
                GamifyEd
              </span>
            </div>
            <div style={{
              display: 'flex',
              gap: isMobile ? '1rem' : '1.5rem',
              flexDirection: isMobile ? 'row' : 'row'
            }}>
              <Link to="/" style={{
                color: '#1e293b',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}>
                Home
              </Link>
              <Link to="/about" style={{
                color: '#1e293b',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}>
                About
              </Link>
              <Link to="/contact" style={{
                color: '#1e293b',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}>
                Contact
              </Link>
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: isMobile ? '0.75rem' : '1rem'
          }}>
            <Link to="/login" style={{
              padding: isMobile ? '0.5rem 1rem' : '0.5rem 1.25rem',
              backgroundColor: 'transparent',
              color: '#1e293b',
              border: '1px solid #1e293b',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              textDecoration: 'none'
            }}>
              Login
            </Link>
            <Link to="/signup" style={{
              padding: isMobile ? '0.5rem 1rem' : '0.5rem 1.25rem',
              backgroundColor: '#1e293b',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
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
          height: isMobile ? '60vh' : '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: 'bold',
              marginBottom: '1.25rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Welcome to GamifyEd
            </h1>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.25rem',
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
                padding: isMobile ? '0.75rem 2rem' : '0.75rem 2.5rem',
                fontSize: isMobile ? '1rem' : '1.25rem',
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
          padding: isMobile ? '3rem 1rem' : '6rem 2rem',
          background: 'white',
          position: 'relative'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr',
              gap: isMobile ? '2rem' : '4rem',
              alignItems: 'center'
            }}>
              {/* Left Column - Content */}
              <motion.div
                key={currentCarousel}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                style={{
                  maxWidth: isMobile ? '100%' : '400px'
                }}
              >
                <h2 style={{
                  fontSize: isMobile ? '1.75rem' : '2.25rem',
                  color: '#1e293b',
                  fontWeight: 'bold',
                  marginBottom: '1.25rem',
                  lineHeight: '1.2'
                }}>
                  {carouselItems[currentCarousel].title}
                </h2>
                <p style={{
                  fontSize: isMobile ? '1rem' : '1.1rem',
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
                    padding: isMobile ? '0.75rem 1.25rem' : '0.75rem 1.5rem',
                    fontSize: isMobile ? '1rem' : '1.1rem',
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
                height: isMobile ? '300px' : '500px'
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
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
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
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    →
                  </motion.button>

                  {/* Carousel Image */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCarousel}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <img
                        src={carouselItems[currentCarousel].image}
                        alt={carouselItems[currentCarousel].title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Carousel Indicators */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '1rem'
                }}>
                  {carouselItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCarousel(index)}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        border: 'none',
                        background: index === currentCarousel ? '#1e293b' : '#cbd5e1',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div style={{
          padding: isMobile ? '3rem 1rem' : '6rem 2rem',
          background: '#f8fafc'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: isMobile ? '2rem' : '4rem'
            }}>
              <h2 style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                color: '#1e293b',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                Why Choose GamifyEd?
              </h2>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.125rem',
                color: '#64748b',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Experience learning like never before with our innovative platform
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '2rem' : '3rem'
            }}>
              {/* Feature 1 */}
              <div style={{
                background: 'white',
                padding: isMobile ? '1.5rem' : '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#eff6ff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem',
                  color: '#2563eb'
                }}>
                  🎯
                </div>
                <h3 style={{
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  color: '#1e293b',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem'
                }}>
                  Personalized Learning
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.6'
                }}>
                  Adaptive quizzes that adjust to your learning pace and style
                </p>
              </div>

              {/* Feature 2 */}
              <div style={{
                background: 'white',
                padding: isMobile ? '1.5rem' : '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#f0fdf4',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem',
                  color: '#16a34a'
                }}>
                  📊
                </div>
                <h3 style={{
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  color: '#1e293b',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem'
                }}>
                  Progress Tracking
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.6'
                }}>
                  Detailed analytics and insights to monitor your growth
                </p>
              </div>

              {/* Feature 3 */}
              <div style={{
                background: 'white',
                padding: isMobile ? '1.5rem' : '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#fef3c7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem',
                  color: '#d97706'
                }}>
                  🌍
                </div>
                <h3 style={{
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  color: '#1e293b',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem'
                }}>
                  Global Community
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.6'
                }}>
                  Connect with learners worldwide and compete on leaderboards
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          padding: isMobile ? '3rem 1rem' : '6rem 2rem',
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              Ready to Start Your Learning Journey?
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              marginBottom: '2rem',
              opacity: 0.9
            }}>
              Join thousands of learners who are already transforming their education experience
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleActionClick}
              style={{
                padding: isMobile ? '0.75rem 2rem' : '1rem 2.5rem',
                fontSize: isMobile ? '1rem' : '1.125rem',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: '600',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
              }}
            >
              Get Started Today
            </motion.button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: '#1e293b',
        color: 'white',
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p style={{
            margin: 0,
            opacity: 0.8,
            fontSize: isMobile ? '0.875rem' : '1rem'
          }}>
            © 2024 GamifyEd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 