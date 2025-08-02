import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const teamMembers = [
  {
    name: "Shatakshi Sachan",
    role: "Software Developer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80"
  }
];

const features = [
  {
    title: "Interactive Learning",
    description: "Engage with our dynamic learning platform that adapts to your pace and style.",
    icon: "🎯"
  },
  {
    title: "Smart Analytics",
    description: "Track your progress with detailed insights and personalized recommendations.",
    icon: "📊"
  },
  {
    title: "Global Community",
    description: "Join a worldwide network of learners and share knowledge.",
    icon: "🌍"
  }
];

export function About() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
        flex: 1
      }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: isMobile ? '4rem 1rem' : '6rem 2rem',
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              About GamifyEd
            </h1>
            <p style={{
              fontSize: isMobile ? '1.125rem' : '1.25rem',
              maxWidth: '800px',
              margin: '0 auto',
              opacity: 0.9,
              lineHeight: '1.6'
            }}>
              Transforming education through interactive learning experiences and gamified assessments
            </p>
          </motion.div>
        </div>

        {/* Mission Section */}
        <div style={{
          padding: isMobile ? '3rem 1rem' : '6rem 2rem',
          background: 'white'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '2rem' : '4rem',
              alignItems: 'center'
            }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 style={{
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  color: '#1e293b',
                  fontWeight: 'bold',
                  marginBottom: '1.5rem'
                }}>
                  Our Mission
                </h2>
                <p style={{
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  color: '#64748b',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem'
                }}>
                  We believe that learning should be engaging, accessible, and personalized. 
                  Our platform combines cutting-edge technology with proven educational 
                  methodologies to create an experience that motivates and empowers learners.
                </p>
                <p style={{
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  color: '#64748b',
                  lineHeight: '1.7'
                }}>
                  Through gamification, adaptive learning algorithms, and a supportive 
                  community, we're making education more effective and enjoyable for 
                  learners worldwide.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: isMobile ? '8rem' : '10rem',
                  marginBottom: '1rem'
                }}>
                  🎓
                </div>
              </motion.div>
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
              marginBottom: isMobile ? '3rem' : '4rem'
            }}>
              <h2 style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                color: '#1e293b',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                What Makes Us Different
              </h2>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.125rem',
                color: '#64748b',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Our innovative approach to education sets us apart
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '2rem' : '3rem'
            }}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    background: 'white',
                    padding: isMobile ? '1.5rem' : '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{
                    fontSize: isMobile ? '2.5rem' : '3rem',
                    marginBottom: '1rem'
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{
                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                    color: '#1e293b',
                    fontWeight: 'bold',
                    marginBottom: '0.75rem'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: '#64748b',
                    lineHeight: '1.6'
                  }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div style={{
          padding: isMobile ? '3rem 1rem' : '6rem 2rem',
          background: 'white'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: isMobile ? '3rem' : '4rem'
            }}>
              <h2 style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                color: '#1e293b',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                Meet Our Team
              </h2>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.125rem',
                color: '#64748b',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                The passionate individuals behind GamifyEd
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: isMobile ? '2rem' : '3rem'
            }}>
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: '#f8fafc',
                    padding: isMobile ? '1.5rem' : '2rem',
                    borderRadius: '12px',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: isMobile ? '120px' : '150px',
                      height: isMobile ? '120px' : '150px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      margin: '0 auto 1rem',
                      border: '4px solid white',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <h3 style={{
                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                    color: '#1e293b',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    {member.name}
                  </h3>
                  <p style={{
                    color: '#64748b',
                    fontSize: isMobile ? '0.875rem' : '1rem'
                  }}>
                    {member.role}
                  </p>
                </motion.div>
              ))}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              Ready to Start Learning?
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              marginBottom: '2rem',
              opacity: 0.9
            }}>
              Join thousands of learners who are already transforming their education
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
              style={{
                padding: isMobile ? '0.75rem 2rem' : '1rem 2.5rem',
                fontSize: isMobile ? '1rem' : '1.125rem',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: '600',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
              }}
            >
              Get Started Today
            </motion.button>
          </motion.div>
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