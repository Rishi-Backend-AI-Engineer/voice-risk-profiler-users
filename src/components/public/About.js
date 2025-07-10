import React from 'react';

const About = () => {
  // Company data structure - ready for API integration
  const companyData = {
    name: "ZETHETA",
    mainTitle: "Voice-Analysis Risk Profiler",
    tagline: "Revolutionizing Security Through Vocal Intelligence",
    aboutSection: {
      title: "About Us",
      description: "Voice Analysis Risk Profiling represents a cutting-edge approach to security assessment that leverages the unique characteristics of human speech patterns to identify potential threats and evaluate risk levels in real-time."
    },
    productSection: {
      title: "About the product",
      description: "Voice analyser is our flagship voice analysis platform that delivers enterprise-grade security through advanced AI-powered vocal intelligence. The cloud-based solution processes voice interactions in real-time, analyzing over 3,000 acoustic and linguistic parameters to identify potential security threats, fraud attempts, and behavioral anomalies. With 94.2% accuracy rates and sub-second processing speeds, VoiceGuard Pro seamlessly integrates with existing telephony and security systems through robust APIs, supporting 45+ languages while maintaining the highest standards of data protection and privacy compliance. The platform serves organizations across financial services, healthcare, law enforcement, and corporate security sectors, providing actionable insights through an intuitive dashboard interface and mobile applications for comprehensive risk management."
    }
  };

  // Future API integration handlers
  const fetchCompanyData = async () => {
    try {
      // Future API call
      // const response = await fetch('/api/company-info');
      // const data = await response.json();
      // return data;
      console.log('Fetching company data...');
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  const trackPageView = () => {
    // Future analytics integration
    console.log('About page viewed');
  };

  React.useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#205c79' }}>
      {/* Hero Section */}
      <div className="text-center px-8 pt-16 pb-12">
        <h1 
          className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight"
          style={{ fontFamily: 'Archivo Black, sans-serif' }}
        >
          {companyData.mainTitle}
        </h1>
        
        <p 
          className="text-xl md:text-2xl text-white font-medium max-w-4xl mx-auto leading-relaxed"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {companyData.tagline}
        </p>
      </div>

      {/* About Us Section */}
      <div className="px-8 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold text-white mb-8"
            style={{ fontFamily: 'Archivo Black, sans-serif' }}
          >
            {companyData.aboutSection.title}
          </h2>
          
          <p 
            className="text-lg md:text-xl text-white leading-relaxed font-normal"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {companyData.aboutSection.description}
          </p>
        </div>
      </div>

      {/* Product Information Section */}
      <div className="px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div 
            className="rounded-3xl p-8 md:p-12 shadow-2xl"
            style={{ backgroundColor: '#f07d24' }}
          >
            <h3 
              className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
              style={{ fontFamily: 'Archivo Black, sans-serif' }}
            >
              {companyData.productSection.title}
            </h3>
            
            <p 
              className="text-lg md:text-xl text-white leading-relaxed font-normal text-center"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {companyData.productSection.description}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Sections for Future Enhancement */}
      {/* 
      <FeaturesSection />
      <TestimonialsSection />
      <ContactSection />
      */}
    </div>
  );
};

// Future component exports for modular structure
export const HeroSection = ({ title, tagline }) => {
  return (
    <div className="text-center px-8 pt-16 pb-12">
      <h1 
        className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight"
        style={{ fontFamily: 'Archivo Black, sans-serif' }}
      >
        {title}
      </h1>
      
      <p 
        className="text-xl md:text-2xl text-white font-medium max-w-4xl mx-auto leading-relaxed"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        {tagline}
      </p>
    </div>
  );
};

export const AboutSection = ({ title, description }) => {
  return (
    <div className="px-8 pb-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 
          className="text-3xl md:text-4xl font-bold text-white mb-8"
          style={{ fontFamily: 'Archivo Black, sans-serif' }}
        >
          {title}
        </h2>
        
        <p 
          className="text-lg md:text-xl text-white leading-relaxed font-normal"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export const ProductSection = ({ title, description, backgroundColor = '#f07d24' }) => {
  return (
    <div className="px-8 pb-16">
      <div className="max-w-4xl mx-auto">
        <div 
          className="rounded-3xl p-8 md:p-12 shadow-2xl"
          style={{ backgroundColor }}
        >
          <h3 
            className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
            style={{ fontFamily: 'Archivo Black, sans-serif' }}
          >
            {title}
          </h3>
          
          <p 
            className="text-lg md:text-xl text-white leading-relaxed font-normal text-center"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main export
export default About;