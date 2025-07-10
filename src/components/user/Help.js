import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const navigate = useNavigate();

  // Navigation handlers
  const handleNavigateToProfile = () => {
    navigate('/profile');
  };

  const handleNavigateToContact = () => {
    navigate('/contact');
  };

  const handleNavigateToHelp = () => {
    navigate('/help');
  };

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, user data, etc.)
    navigate('/login');
  };

  const handleNavigateToRiskProfiler = () => {
    navigate('/feature');
  };

  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setTimeout(() => setActiveButton(null), 200);
    console.log(`${buttonName} button clicked`);

    // Add navigation based on button clicked
    switch(buttonName) {
      case 'My profile':
        handleNavigateToProfile();
        break;
      case 'Contact':
        handleNavigateToContact();
        break;
      case 'Help':
        handleNavigateToHelp();
        break;
      case 'Log out':
        handleLogout();
        break;
      case 'Risk profiler':
        handleNavigateToRiskProfiler();
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Your enquiry has been submitted successfully!');
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const containerStyle = {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
  };

  const backgroundStyle = {
    position: 'absolute',
    inset: '0',
    background: '#205c79'
  };

  const circle1Style = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '24rem',
    height: '24rem',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(246, 159, 28, 0.4) 0%, transparent 70%)',
    opacity: '0.3'
  };

  const circle2Style = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '20rem',
    height: '20rem',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(240, 125, 36, 0.3) 0%, transparent 70%)',
    opacity: '0.4'
  };

  const circle3Style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '16rem',
    height: '16rem',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(246, 159, 28, 0.4) 0%, transparent 70%)',
    opacity: '0.2'
  };

  const mainContentStyle = {
    position: 'relative',
    zIndex: '10',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem'
  };

  const logoSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer'
  };

  const logoTextStyle = {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: 'white'
  };

  const navButtonsStyle = {
    display: 'flex',
    gap: '0.75rem'
  };

  const getNavButtonStyle = (isActive) => ({
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: '500',
    backgroundColor: '#f07d24',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transform: isActive ? 'scale(0.95)' : 'scale(1)'
  });

  const mainSectionStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    textAlign: 'center'
  };

  const contentWrapperStyle = {
    maxWidth: '48rem',
    margin: '0 auto',
    width: '100%'
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1rem'
  };

  const subtitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'white',
    marginBottom: '2rem'
  };

  const formCardStyle = {
    padding: '2rem',
    borderRadius: '1rem',
    backgroundColor: 'rgba(240, 125, 36, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    textAlign: 'left'
  };

  const formGroupStyle = {
    marginBottom: '1.5rem'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    marginBottom: '0.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical'
  };

  const submitButtonStyle = {
    padding: '1rem 2rem',
    borderRadius: '9999px',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    backgroundColor: '#f69f1c',
    color: '#205c79',
    border: '3px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    width: '100%'
  };

  return (
    <div style={containerStyle}>
      {/* Background */}
      <div style={backgroundStyle}></div>
      
      {/* Decorative gradient circles */}
      <div style={circle1Style}></div>
      <div style={circle2Style}></div>
      <div style={circle3Style}></div>

      {/* Main content */}
      <div style={mainContentStyle}>
        {/* Header */}
        <header style={headerStyle}>
          <div style={logoSectionStyle} onClick={handleNavigateToDashboard}>
            <div style={logoTextStyle}>
              <span style={{ color: '#f69f1c' }}>Z</span>
              <span style={{ marginLeft: '0.25rem' }}>ZETHETA</span>
            </div>
          </div>
          
          <nav style={navButtonsStyle}>
            {['My profile', 'Contact', 'Help', 'Log out'].map((item) => (
              <button
                key={item}
                onClick={() => handleButtonClick(item)}
                style={getNavButtonStyle(activeButton === item)}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = activeButton === item ? 'scale(0.95)' : 'scale(1)'}
              >
                {item}
              </button>
            ))}
          </nav>
        </header>

        {/* Main content area */}
        <main style={mainSectionStyle}>
          <div style={contentWrapperStyle}>
            {/* Page title */}
            <h1 style={titleStyle}>Help & Support</h1>
            
            {/* Subtitle */}
            <h2 style={subtitleStyle}>Have a question? We're here to help!</h2>
            
            {/* Enquiry form */}
            <div style={formCardStyle}>
              <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                  <label htmlFor="name" style={labelStyle}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    placeholder="Enter your full name"
                  />
                </div>

                <div style={formGroupStyle}>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    placeholder="Enter your email address"
                  />
                </div>

                <div style={formGroupStyle}>
                  <label htmlFor="subject" style={labelStyle}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    placeholder="What's your enquiry about?"
                  />
                </div>

                <div style={formGroupStyle}>
                  <label htmlFor="message" style={labelStyle}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    style={textareaStyle}
                    placeholder="Please describe your question or issue in detail..."
                  />
                </div>

                <button
                  type="submit"
                  style={submitButtonStyle}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Help;