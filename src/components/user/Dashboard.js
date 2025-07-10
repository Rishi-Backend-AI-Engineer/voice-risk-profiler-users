import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  // Navigation handlers
  const handleNavigateToProfile = () => {
    navigate('/profile');
  };

  const handleNavigateToContact = () => {
    navigate('/contact');
  };

  const handleNavigateToHelp = () => {
    navigate('/about'); // or create a dedicated help route
  };

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, user data, etc.)
    navigate('/login');
  };

  const handleNavigateToRiskProfiler = () => {
    navigate('/feature'); // This will go to your MainFeature component
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

  const containerStyle = {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
  };

  const backgroundStyle = {
    position: 'absolute',
    inset: '0',
    background: 'linear-gradient(135deg, #f69f1c 0%, #f07d24 30%, #205c79 100%)'
  };

  const circle1Style = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '24rem',
    height: '24rem',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(32, 92, 121, 0.4) 0%, transparent 70%)',
    opacity: '0.3'
  };

  const circle2Style = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '20rem',
    height: '20rem',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(246, 159, 28, 0.3) 0%, transparent 70%)',
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
    background: 'radial-gradient(circle, rgba(240, 125, 36, 0.4) 0%, transparent 70%)',
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
    gap: '0.5rem'
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
    backgroundColor: '#205c79',
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
    margin: '0 auto'
  };

  const welcomeTitleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1rem'
  };

  const mainQuestionStyle = {
    fontSize: '1.875rem',
    fontWeight: '600',
    color: 'white',
    marginBottom: '2rem'
  };

  const getRiskProfilerButtonStyle = (isActive) => ({
    padding: '1rem 2rem',
    borderRadius: '9999px',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    backgroundColor: '#f07d24',
    color: '#205c79',
    border: '3px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    marginBottom: '3rem',
    transform: isActive ? 'scale(0.95)' : 'scale(1)'
  });

  const howItWorksStyle = {
    marginTop: '3rem'
  };

  const howItWorksTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'white',
    marginBottom: '1.5rem'
  };

  const explanationCardStyle = {
    padding: '2rem',
    borderRadius: '1rem',
    backgroundColor: 'rgba(32, 92, 121, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  };

  const explanationTextStyle = {
    fontSize: '1.125rem',
    color: 'white',
    lineHeight: '1.75'
  };

  return (
    <div style={containerStyle}>
      {/* Background with gradient */}
      <div style={backgroundStyle}></div>
      
      {/* Decorative gradient circles */}
      <div style={circle1Style}></div>
      <div style={circle2Style}></div>
      <div style={circle3Style}></div>

      {/* Main content */}
      <div style={mainContentStyle}>
        {/* Header */}
        <header style={headerStyle}>
          <div style={logoSectionStyle}>
            {/* ===== INSERT YOUR LOGO HERE ===== */}
            {/* Replace the div below with your logo image */}
            {/* Example: <img src="/path/to/your/logo.png" alt="Zetheta Logo" style={{height: '3rem', width: 'auto'}} /> */}
            <div style={logoTextStyle}>
              <span style={{ color: '#205c79' }}>Z</span>
              <span style={{ marginLeft: '0.25rem' }}>ZETHETA</span>
            </div>
            {/* ===== END LOGO SECTION ===== */}
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
            {/* Welcome message */}
            <h1 style={welcomeTitleStyle}>Welcome User!</h1>
            
            {/* Main question */}
            <h2 style={mainQuestionStyle}>Ready to try out the risk profiler?</h2>
            
            {/* Risk profiler button */}
            <button
              onClick={() => handleButtonClick('Risk profiler')}
              style={getRiskProfilerButtonStyle(activeButton === 'Risk profiler')}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = activeButton === 'Risk profiler' ? 'scale(0.95)' : 'scale(1)'}
            >
              Risk profiler
            </button>
            
            {/* How does it work section */}
            <div style={howItWorksStyle}>
              <h3 style={howItWorksTitleStyle}>How does it work?</h3>
              
              <div style={explanationCardStyle}>
                <p style={explanationTextStyle}>
                  Speak your mind or upload a voice clip—our system will analyze it and give you a clear 
                  risk profile along with smart, actionable suggestions.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;