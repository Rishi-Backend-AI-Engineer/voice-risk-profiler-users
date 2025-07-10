import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Google Fonts Import */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Archivo+Black&display=swap" rel="stylesheet" />
      
      <nav style={{ backgroundColor: '#205c79' }} className="text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#FF8C00' }}
            >
              <span 
                className="text-white font-bold text-lg"
                style={{ fontFamily: 'Archivo Black, sans-serif' }}
              >
                Z
              </span>
            </div>
            <div 
              className="text-xl font-bold tracking-wide text-white"
              style={{ fontFamily: 'Archivo Black, sans-serif' }}
            >
              ZETHETA
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-3">
            <button 
              className="px-4 py-2 rounded-lg transition-all duration-200 hover:scale-[1.05] font-medium cursor-pointer text-sm"
              style={{ 
                backgroundColor: '#e67e22',
                fontFamily: 'Poppins, sans-serif',
                color: 'white',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#d35400';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#e67e22';
              }}
              onClick={() => navigate('/profile')}
            >
              My profile
            </button>
            <button 
              className="px-4 py-2 rounded-lg transition-all duration-200 hover:scale-[1.05] font-medium cursor-pointer text-sm"
              style={{ 
                backgroundColor: '#e67e22',
                fontFamily: 'Poppins, sans-serif',
                color: 'white',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#d35400';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#e67e22';
              }}
              onClick={() => navigate('/contact')}
            >
              Contact
            </button>
            <button 
              className="px-4 py-2 rounded-lg transition-all duration-200 hover:scale-[1.05] font-medium cursor-pointer text-sm"
              style={{ 
                backgroundColor: '#e67e22',
                fontFamily: 'Poppins, sans-serif',
                color: 'white',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#d35400';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#e67e22';
              }}
              onClick={() => navigate('/help')}
            >
              Help
            </button>
            <button 
              className="px-4 py-2 rounded-lg transition-all duration-200 hover:scale-[1.05] font-medium cursor-pointer text-sm"
              style={{ 
                backgroundColor: '#e67e22',
                fontFamily: 'Poppins, sans-serif',
                color: 'white',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#d35400';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#e67e22';
              }}
              onClick={() => navigate('/logout')}
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;