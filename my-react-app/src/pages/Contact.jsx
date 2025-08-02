import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
              Get in Touch
            </h1>
            <p style={{
              fontSize: isMobile ? '1.125rem' : '1.25rem',
              maxWidth: '800px',
              margin: '0 auto',
              opacity: 0.9,
              lineHeight: '1.6'
            }}>
              Have questions or feedback? We'd love to hear from you
            </p>
          </motion.div>
        </div>

        {/* Contact Form Section */}
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
              gap: isMobile ? '3rem' : '6rem',
              alignItems: 'start'
            }}>
              {/* Contact Form */}
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
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  <div>
                    <label htmlFor="name" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#4a5568',
                      fontWeight: '500',
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: isMobile ? '0.75rem' : '1rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: isMobile ? '0.875rem' : '1rem',
                        transition: 'border-color 0.2s ease',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#4a5568',
                      fontWeight: '500',
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: isMobile ? '0.75rem' : '1rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: isMobile ? '0.875rem' : '1rem',
                        transition: 'border-color 0.2s ease',
                        boxSizing: 'border-box'
                      }}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#4a5568',
                      fontWeight: '500',
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={isMobile ? 6 : 8}
                      style={{
                        width: '100%',
                        padding: isMobile ? '0.75rem' : '1rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: isMobile ? '0.875rem' : '1rem',
                        transition: 'border-color 0.2s ease',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: isMobile ? '0.875rem 2rem' : '1rem 2.5rem',
                      backgroundColor: '#3182ce',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: isMobile ? '1rem' : '1.125rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      alignSelf: 'flex-start'
                    }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 style={{
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  color: '#1e293b',
                  fontWeight: 'bold',
                  marginBottom: '1.5rem'
                }}>
                  Contact Information
                </h2>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: '#eff6ff',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      📧
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: isMobile ? '1.125rem' : '1.25rem',
                        color: '#1e293b',
                        fontWeight: 'bold',
                        marginBottom: '0.25rem'
                      }}>
                        Email
                      </h3>
                      <p style={{
                        color: '#64748b',
                        fontSize: isMobile ? '0.875rem' : '1rem'
                      }}>
                        support@gamifyed.com
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: '#f0fdf4',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      📱
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: isMobile ? '1.125rem' : '1.25rem',
                        color: '#1e293b',
                        fontWeight: 'bold',
                        marginBottom: '0.25rem'
                      }}>
                        Phone
                      </h3>
                      <p style={{
                        color: '#64748b',
                        fontSize: isMobile ? '0.875rem' : '1rem'
                      }}>
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: '#fef3c7',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      🌍
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: isMobile ? '1.125rem' : '1.25rem',
                        color: '#1e293b',
                        fontWeight: 'bold',
                        marginBottom: '0.25rem'
                      }}>
                        Address
                      </h3>
                      <p style={{
                        color: '#64748b',
                        fontSize: isMobile ? '0.875rem' : '1rem',
                        lineHeight: '1.5'
                      }}>
                        123 Education Street<br />
                        Learning City, LC 12345<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: '3rem',
                  padding: '2rem',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                    color: '#1e293b',
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                  }}>
                    Office Hours
                  </h3>
                  <p style={{
                    color: '#64748b',
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    lineHeight: '1.6'
                  }}>
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </motion.div>
            </div>
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