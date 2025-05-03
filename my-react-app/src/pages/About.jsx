import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

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
        flex: 1
      }}>
        {/* Hero Section */}
        <div style={{
          background: '#f8fafc',
          padding: '4rem 2rem',
          textAlign: 'center',
          '@media (maxWidth: 768px)': {
            padding: '2rem 1rem'
          }
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontSize: '3rem',
              color: '#1e293b',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              About GamifyEd
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#475569',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Empowering learners worldwide through innovative education technology
            </p>
          </motion.div>
        </div>

        {/* Mission Section */}
        <div style={{
          padding: '6rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          '@media (maxWidth: 768px)': {
            padding: '3rem 1rem'
          }
        }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              color: '#1e293b',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              Our Mission
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#475569',
              lineHeight: '1.8',
              marginBottom: '2rem'
            }}>
              At GamifyEd, we believe in making quality education accessible to everyone. Our platform combines cutting-edge technology with proven learning methodologies to create an engaging and effective learning experience.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <div style={{
                padding: '1rem',
                background: '#f1f5f9',
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#1e293b'
                }}>
                  50K+
                </div>
                <div style={{
                  color: '#64748b'
                }}>
                  Active Users
                </div>
              </div>
              <div style={{
                padding: '1rem',
                background: '#f1f5f9',
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#1e293b'
                }}>
                  100+
                </div>
                <div style={{
                  color: '#64748b'
                }}>
                  Countries
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <div style={{
          padding: '6rem 2rem',
          background: '#f8fafc',
          '@media (maxWidth: 768px)': {
            padding: '3rem 1rem'
          }
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              color: '#1e293b',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '3rem',
              '@media (maxWidth: 768px)': {
                fontSize: '2rem'
              }
            }}>
              Meet Our Team
            </h2>
            <div style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  style={{
                    textAlign: 'center',
                    maxWidth: '400px'
                  }}
                >
                  <div style={{
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <h3 style={{
                    fontSize: '1.75rem',
                    color: '#1e293b',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    {member.name}
                  </h3>
                  <p style={{
                    color: '#64748b',
                    fontSize: '1.25rem'
                  }}>
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
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
          textAlign: 'center'
        }}>
          © 2025 GamifyEd. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 