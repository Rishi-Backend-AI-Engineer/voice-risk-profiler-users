import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Upload, Mic } from 'lucide-react';

const VoiceRiskProfiler = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const centisecs = Math.floor(Math.random() * 100);
    return `${mins}:${secs.toString().padStart(2, '0')}:${centisecs.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setRecordingTime(0);
    }
    setIsRecording(!isRecording);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const proceedToResults = () => {
    setCurrentStep(2);
  };

  // Navigation handlers
  const handleNavigateToProfile = () => {
    navigate('/profile');
  };

  const handleNavigateToContact = () => {
    navigate('/contact');
  };
  const handleNavigateToDashboard = () => {
  navigate('/dashboard');
  };
  const handleNavigateToHelp = () => {
    // If you don't have a help page, you could navigate to about or create a help route
    navigate('/about');
  };

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, user data, etc.)
    // For now, we'll just navigate to login
    navigate('/login');
  };

  if (currentStep === 2) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f07d24 0%, #f69f1c 50%, #ffd700 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '50px'
          }}>
            {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#205c79',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                Z
              </div>
              <span style={{ color: '#205c79', fontWeight: 'bold', fontSize: '24px' }}>ZETHETA</span>
            </div> */}
            <div 
  onClick={handleNavigateToDashboard}
  style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px',
    cursor: 'pointer' // Add cursor pointer to indicate it's clickable
  }}
>
  <div style={{
    width: '32px',
    height: '32px',
    backgroundColor: '#f07d24',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px'
  }}>
    Z
  </div>
  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>ZETHETA</span>
</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={handleNavigateToProfile}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: '#205c79',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                My profile
              </button>
              <button 
                onClick={handleNavigateToContact}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#205c79',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Contact
              </button>
              <button 
                onClick={handleNavigateToHelp}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#205c79',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Help
              </button>
              <button 
                onClick={handleLogout}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#205c79',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Log out
              </button>
            </div>
          </div>

          {/* Results Content */}
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              color: 'white',
              fontSize: '36px',
              fontWeight: 'bold',
              marginBottom: '60px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>
              Your Risk Profile is ready!
            </h1>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <div style={{
                backgroundColor: '#f07d24',
                border: '4px solid white',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  color: '#205c79',
                  fontSize: '24px',
                  fontWeight: '600'
                }}>
                  Emotion detected: Anxious
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#f07d24',
                border: '4px solid white',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  color: '#205c79',
                  fontSize: '24px',
                  fontWeight: '600'
                }}>
                  Risk level: Medium
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#f07d24',
                border: '4px solid white',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  color: '#205c79',
                  fontSize: '24px',
                  fontWeight: '600'
                }}>
                  Recommended action: Proceed
                </div>
              </div>
            </div>

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button
                onClick={() => setCurrentStep(1)}
                style={{
                  backgroundColor: '#205c79',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                New Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #205c79 0%, #205c79 40%, #f07d24 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '50px'
        }}>
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#f07d24',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              Z
            </div>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>ZETHETA</span>
          </div> */}
          <div 
  onClick={handleNavigateToDashboard}
  style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px',
    cursor: 'pointer' // Add cursor pointer to indicate it's clickable
  }}
>
  <div style={{
    width: '32px',
    height: '32px',
    backgroundColor: '#f07d24',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px'
  }}>
    Z
  </div>
  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>ZETHETA</span>
</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={handleNavigateToProfile}
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              My profile
            </button>
            <button 
              onClick={handleNavigateToContact}
              style={{
                padding: '8px 16px',
                backgroundColor: '#1a4d66',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Contact
            </button>
            <button 
              onClick={handleNavigateToHelp}
              style={{
                padding: '8px 16px',
                backgroundColor: '#1a4d66',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Help
            </button>
            <button 
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#1a4d66',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Log out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            color: 'white',
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '60px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            Voice based Risk Profiler
          </h1>

          {/* Upload Section */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{
              color: 'white',
              fontSize: '20px',
              marginBottom: '20px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              Upload your audio file
            </p>
            <div style={{
              backgroundColor: '#f07d24',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '30px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }}>
              <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
                <div style={{
                  border: '3px dashed #205c79',
                  borderRadius: '15px',
                  padding: '40px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transition: 'background-color 0.3s ease'
                }}>
                  <Upload style={{
                    margin: '0 auto 15px auto',
                    color: '#205c79',
                    display: 'block'
                  }} size={32} />
                  <span style={{
                    color: '#205c79',
                    fontSize: '20px',
                    fontWeight: '600'
                  }}>
                    Choose file to upload
                  </span>
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              {uploadedFile && (
                <div style={{
                  marginTop: '20px',
                  color: '#205c79',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  Uploaded: {uploadedFile.name}
                </div>
              )}
            </div>
          </div>

          {/* Recording Section */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{
              color: 'white',
              fontSize: '20px',
              marginBottom: '20px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              Or record your audio here
            </p>
            <div style={{
              backgroundColor: '#f07d24',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }}>
              <div style={{
                border: '3px solid #205c79',
                borderRadius: '15px',
                padding: '40px',
                marginBottom: '30px',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <Mic style={{ color: '#205c79' }} size={28} />
                  <span style={{
                    color: '#205c79',
                    fontSize: '20px',
                    fontWeight: '600'
                  }}>
                    Record your audio here
                  </span>
                  <button
                    onClick={toggleRecording}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#dc2626',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: isRecording ? '0 0 10px rgba(220, 38, 38, 0.5)' : 'none'
                    }}
                  />
                </div>
              </div>
              
              {/* Audio Controls */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
              }}>
                <button
                  onClick={togglePlayback}
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}
                >
                  {isPlaying ? <Pause style={{ color: '#205c79' }} size={24} /> : <Play style={{ color: '#205c79', marginLeft: '3px' }} size={24} />}
                </button>
                
                <span style={{
                  color: 'white',
                  fontFamily: 'monospace',
                  fontSize: '20px',
                  fontWeight: '600',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}>
                  {formatTime(recordingTime)}
                </span>
                
                {/* Waveform visualization */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  {[...Array(25)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: '3px',
                        height: `${Math.random() * 25 + 8}px`,
                        backgroundColor: 'white',
                        borderRadius: '2px',
                        opacity: isRecording ? (0.6 + Math.random() * 0.4) : 0.4,
                        transition: 'opacity 0.3s ease'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {(uploadedFile || recordingTime > 0) && (
            <button
              onClick={proceedToResults}
              style={{
                backgroundColor: '#205c79',
                color: 'white',
                padding: '15px 40px',
                border: 'none',
                borderRadius: '25px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#1a4d66';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#205c79';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Analyze Audio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceRiskProfiler;