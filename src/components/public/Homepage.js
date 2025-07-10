

import React, { useState, useEffect } from 'react';
import { Search, Star, ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchPosition, setSearchPosition] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(1);

  const reviews = [
    {
      id: 1,
      rating: 5,
      text: "Voice changed our threat perception. Highly detailed, very thorough and substantial financial insights.",
      author: "Security Professional"
    },
    {
      id: 2,
      rating: 5,
      text: "Impressive accuracy and ease of use. Advanced, friendly interface and thorough insights.",
      author: "Risk Analyst"
    },
    {
      id: 3,
      rating: 4,
      text: "Great performance with excellent documentation. Powerful engine with enhanced security features.",
      author: "IT Manager"
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRequestDemo = () => {
    // Future API integration point
    console.log('Request demo clicked - integrate with API');
  };

  const handleGetStarted = () => {
    // Future API integration point
    console.log('Get started clicked - integrate with API');
  };

  const handlePrivacyClick = () => {
    navigate('/privacy');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const renderAnimatedStars = () => {
    // Calculate how many stars should be filled based on scanner position
    const filledStars = Math.floor((searchPosition / 100) * 5) + 1;
    
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={i < filledStars ? 'fill-yellow-400 text-yellow-400' : 'text-white'}
      />
    ));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchPosition(prev => {
        const newPosition = prev + (animationDirection * 2);
        if (newPosition >= 100) {
          setAnimationDirection(-1);
          return 100;
        } else if (newPosition <= 0) {
          setAnimationDirection(1);
          return 0;
        }
        return newPosition;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [animationDirection]);

  return (
    <div className="min-h-screen bg-slate-700 text-white">
      {/* Navigation */}
      <nav className="px-6 py-4 relative" style={{ backgroundColor: '#205c79' }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* <div className="text-2xl font-bold">
            Voice-Analysis Risk Profiler
          </div> */}
          
          {/* Desktop Navigation
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="hover:opacity-80 transition-opacity">About</a>
            <a href="#features" className="hover:opacity-80 transition-opacity">Features</a>
            <a href="#reviews" className="hover:opacity-80 transition-opacity">Reviews</a>
            <a href="#contact" className="hover:opacity-80 transition-opacity">Contact</a>
          </div> */}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 relative"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 md:hidden z-40" style={{ backgroundColor: '#205c79', borderTop: '1px solid #f07d24' }}>
              <div className="px-6 py-4 space-y-4">
                <a href="#about" className="block hover:opacity-80 transition-opacity" onClick={toggleMenu}>About</a>
                <a href="#features" className="block hover:opacity-80 transition-opacity" onClick={toggleMenu}>Features</a>
                <a href="#reviews" className="block hover:opacity-80 transition-opacity" onClick={toggleMenu}>Reviews</a>
                <a href="#contact" className="block hover:opacity-80 transition-opacity" onClick={toggleMenu}>Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 text-center" style={{ backgroundColor: '#205c79' }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Voice-Analysis Risk Profiler
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Revolutionizing Security Through Vocal Intelligence
          </p>
          <p className="text-lg mb-12 italic text-gray-200">
            "Emotions Speak Louder Than Words. We Decode Them."
          </p>
          
          <div className="rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-2xl" style={{ backgroundColor: '#f07d24' }}>
            <p className="text-white text-base md:text-lg leading-relaxed mb-8">
              Welcome to a revolution in investor risk profiling. Unlike traditional 
              surveys that miss the nuances of human behaviour, our Voice Risk 
              Profiler leverages cutting-edge voice analysis to decode your true 
              risk appetite - using just your voice. In a world where financial 
              decisions carry immense weight, understanding your authentic risk 
              tolerance is paramount. Voice analysis reveals what surveys can't - 
              intent for what truly matters: hesitation, confidence, stress, and 
              excitement. This results in a multidimensional risk profile based on 
              years—culturally nuanced, regulation-compliant, and advisor-
              approved.
            </p>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">How It Works</h3>
              <div className="text-left space-y-4">
                <div>
                  <h4 className="font-bold text-white mb-2">Why Voice? Why Now?</h4>
                  <p className="text-white text-sm">
                    Traditional risk profiling falls short in capturing 
                    emotional cues. Our tool deciphers vocal signals to deliver 
                    accurate, real-time insights.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={handleRequestDemo}
                className="text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                style={{ backgroundColor: '#205c79' }}
              >
                Request a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-16" style={{ backgroundColor: '#205c79' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6">
                About
              </h2>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Human speech contains over 3,000 
                  measurable characteristics that can 
                  reveal emotional states, stress levels, 
                  and behavioral intentions. Our 
                  proprietary algorithms process these 
                  vocal biomarkers to create 
                  comprehensive risk profiles that 
                  traditional security measures often 
                  miss.
                </p>
              </div>
              
              <button 
                onClick={handleGetStarted}
                className="mt-8 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                style={{ backgroundColor: '#f07d24' }}
              >
                Get Started <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="relative">
              {/* Box removed as requested */}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="px-6 py-16" style={{ backgroundColor: '#1a4a63' }}>
        <div className="max-w-6xl mx-auto">
          <div className="relative flex justify-center mb-12">
            <h2 className="text-4xl font-black text-center">
              Reviews
            </h2>
            
            {/* Animated Search Icon with Fixed Stars - positioned relative to "Reviews" text */}
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2">
              <div className="relative" style={{ width: '140px' }}>
                {/* Fixed stars background */}
                <div className="flex justify-center gap-1 mb-1">
                  {renderAnimatedStars()}
                </div>
                {/* Moving search icon */}
                <div 
                  className="absolute top-0 transition-all duration-100 ease-linear"
                  style={{ left: `${searchPosition}%`, transform: 'translateX(-50%)' }}
                >
                  <Search size={24} className="text-orange-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ backgroundColor: '#205c79' }}>
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-200 mb-4 italic">
                  "{review.text}"
                </p>
                <p className="font-semibold" style={{ color: '#f69f1c' }}>
                  - {review.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16" style={{ backgroundColor: '#205c79' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6">
            Ready to Revolutionize Your Security?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Join industry leaders who trust Voice-Analysis Risk Profiler for comprehensive security insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleRequestDemo}
              className="text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#f07d24' }}
            >
              Request Demo
            </button>
            <button 
              onClick={handleGetStarted}
              className="text-white px-8 py-4 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105"
              style={{ 
                borderColor: '#f07d24',
                backgroundColor: '#f07d24'
              }}
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t" style={{ backgroundColor: '#1a4a63', borderColor: '#f07d24' }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">
            Voice-Analysis Risk Profiler
          </div>
          <p className="text-gray-300 mb-4">
            Revolutionizing Security Through Vocal Intelligence
          </p>
          <div className="flex justify-center space-x-6">
            <button 
              onClick={handlePrivacyClick}
              className="text-gray-300 hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={handleContactClick}
              className="text-gray-300 hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
            >
              Contact
            </button>
          </div>
          <p className="text-gray-400 mt-6 text-sm">
            © 2025 Voice-Analysis Risk Profiler. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;