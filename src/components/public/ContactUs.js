import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiry: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.inquiry || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! Our team will get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        inquiry: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      background: 'linear-gradient(135deg, #205c79 0%, #2a6d8a 100%)',
      color: 'white',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Archivo+Black&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-in;
          }

          .contact-item-hover {
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .contact-item-hover:hover {
            background: rgba(255, 255, 255, 0.3) !important;
            transform: translateX(8px) !important;
          }

          .form-input::placeholder,
          .form-textarea::placeholder {
            color: rgba(255, 255, 255, 0.6);
          }

          .form-input:focus,
          .form-select:focus,
          .form-textarea:focus {
            outline: none;
            border-color: #f07d24;
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 0 15px rgba(240, 125, 36, 0.2);
          }

          .form-select option {
            background: #374151;
            color: white;
          }

          .submit-btn:hover:not(:disabled) {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(240, 125, 36, 0.3);
          }

          @media (max-width: 768px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
          }
        `}
      </style>

      <main style={{ padding: '60px 0' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {/* Hero Section */}
          <div style={{
            textAlign: 'center',
            padding: '80px 0'
          }} className={isLoaded ? 'animate-fade-in' : ''}>
            <h1 style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              marginBottom: '20px',
              fontWeight: '900',
              background: 'linear-gradient(45deg, #ffffff, #f07d24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Contact Us
            </h1>
            <p style={{
              fontSize: '1.5rem',
              opacity: '0.9'
            }}>
              Get in touch with our voice intelligence security experts
            </p>
          </div>

          {/* Contact Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            marginBottom: '80px'
          }} className="contact-grid">
            {/* Contact Info */}
            <div style={{
              background: '#f07d24',
              padding: '40px',
              borderRadius: '24px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: '1.875rem',
                marginBottom: '32px',
                color: 'white'
              }}>
                Get In Touch
              </h2>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '24px',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px'
              }} className="contact-item-hover">
                <div style={{
                  background: 'white',
                  color: '#f07d24',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0
                }}>
                  📧
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    Email
                  </h3>
                  <p style={{ opacity: '0.9' }}>contactus@zetheta.in</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '24px',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px'
              }} className="contact-item-hover">
                <div style={{
                  background: 'white',
                  color: '#f07d24',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0
                }}>
                  📞
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    Phone
                  </h3>
                  <p style={{ opacity: '0.9' }}>+91 91362 49369</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '24px',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px'
              }} className="contact-item-hover">
                <div style={{
                  background: 'white',
                  color: '#f07d24',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0
                }}>
                  📍
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    Address
                  </h3>
                  <p style={{ opacity: '0.9' }}>B3, Grd Flr Silver, Valley1, CHS Ltd</p>
                  <p style={{ opacity: '0.9' }}>Vakola Brg, CSM Marg, Santacruz(East)</p>
                  <p style={{ opacity: '0.9' }}>Mumbai, Maharashtra, India, 400055</p>
                </div>
              </div>

              {/* Office Hours */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '32px',
                borderRadius: '16px',
                marginTop: '32px',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <h3 style={{
                  color: 'white',
                  marginBottom: '16px',
                  fontWeight: '600',
                  fontSize: '1.125rem'
                }}>
                  Office Hours
                </h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  padding: '4px 0'
                }}>
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  padding: '4px 0'
                }}>
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  padding: '4px 0'
                }}>
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  padding: '4px 0'
                }}>
                  <span>Emergency Support</span>
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '40px',
              borderRadius: '24px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: '1.875rem',
                marginBottom: '32px',
                color: 'white'
              }}>
                Send Us A Message
              </h2>
              
              <div onSubmit={handleSubmit}>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#f07d24'
                  }}>
                    Full Name <span style={{ color: '#f07d24' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit'
                    }}
                    className="form-input"
                    required
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#f07d24'
                  }}>
                    Email Address <span style={{ color: '#f07d24' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit'
                    }}
                    className="form-input"
                    required
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#f07d24'
                  }}>
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit'
                    }}
                    className="form-input"
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#f07d24'
                  }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit'
                    }}
                    className="form-input"
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#f07d24'
                  }}>
                    Inquiry Type <span style={{ color: '#f07d24' }}>*</span>
                  </label>
                  <select
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit'
                    }}
                    className="form-select"
                    required
                  >
                    <option value="">Select inquiry type</option>
                    <option value="general">General Information</option>
                    <option value="demo">Product Demo</option>
                    <option value="pricing">Pricing & Plans</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#f07d24'
                  }}>
                    Message <span style={{ color: '#f07d24' }}>*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your voice analysis security needs..."
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      minHeight: '120px'
                    }}
                    className="form-textarea"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  style={{
                    width: '100%',
                    padding: '16px 40px',
                    border: 'none',
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    color: 'white',
                    background: 'linear-gradient(45deg, #f07d24, #f69f1c)',
                    fontFamily: 'inherit',
                    opacity: isSubmitting ? '0.7' : '1'
                  }}
                  className="submit-btn"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;