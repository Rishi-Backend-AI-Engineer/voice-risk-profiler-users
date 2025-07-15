import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Upload, Mic } from 'lucide-react';

const VoiceRiskProfiler = () => {
const [analysisStatus, setAnalysisStatus] = useState("");
const [reportStatus, setReportStatus] = useState("");
const [currentStep, setCurrentStep] = useState(1);
const [isRecording, setIsRecording] = useState(false);
const [isPlaying, setIsPlaying] = useState(false);
const [recordingTime, setRecordingTime] = useState(0);
const [uploadedFile, setUploadedFile] = useState(null);
const [customFilename, setCustomFilename] = useState("");
const [fileList, setFileList] = useState([]);
const [selectedFile, setSelectedFile] = useState("");
const [features, setFeatures] = useState(null);
const [recordedBlob, setRecordedBlob] = useState(null);

const intervalRef = useRef(null);
const mediaRecorderRef = useRef(null);
const audioChunksRef = useRef([]);
const navigate = useNavigate();
const audioPlayerRef = useRef(null);
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

// Fetch file list when component mounts
useEffect(() => {
  fetch("http://localhost:5000/list_files")
    .then((res) => res.json())
    .then((data) => setFileList(data))
    .catch((err) => console.error("Error fetching file list:", err));
}, []);


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const centisecs = Math.floor(Math.random() * 100);
    return `${mins}:${secs.toString().padStart(2, '0')}:${centisecs.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file || !customFilename) {
    alert("Please select a file and enter a filename.");
    return;
  }

  const formData = new FormData();
  formData.append("voice", file, customFilename + ".wav");
  formData.append("custom_filename", customFilename + ".wav");

  try {
    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("File uploaded successfully.");
      setUploadedFile(file);
      fetch("http://localhost:5000/list_files")
        .then((res) => res.json())
        .then((data) => setFileList(data));
    } else {
      alert("Upload failed.");
    }
  } catch (err) {
    alert("Upload error: " + err.message);
  }
};

 
  const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      // setRecordedBlob(blob);
      setRecordedBlob(blob);
audioPlayerRef.current = new Audio(URL.createObjectURL(blob));
      if (customFilename) {
        const formData = new FormData();
        formData.append("voice", blob, customFilename + ".wav");
        formData.append("custom_filename", customFilename + ".wav");

        try {
          const res = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
          });

          if (res.ok) {
            alert("Recording uploaded successfully!");
            fetch("http://localhost:5000/list_files")
              .then((res) => res.json())
              .then((data) => setFileList(data));
          } else {
            alert("Upload failed.");
          }
        } catch (err) {
          alert("Upload error: " + err.message);
        }
      } else {
        alert("Please enter a filename before recording.");
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  } catch (err) {
    alert("Microphone access denied or unavailable.");
  }
};

const stopRecording = () => {
  const recorder = mediaRecorderRef.current;
  if (recorder && recorder.state === "recording") {
    recorder.stop();
    setIsRecording(false);
  }
};

  const togglePlayback = () => {
    if (!audioPlayerRef.current) return;

if (isPlaying) {
  audioPlayerRef.current.pause();
} else {
  audioPlayerRef.current.play();
}

setIsPlaying(!isPlaying);
  };

  const proceedToResults = () => {
    setCurrentStep(2);
  };

const extractFeatures = async () => {
  if (!selectedFile) {
    alert("Please select a file.");
    return;
  }

  const cleanedFilename = selectedFile.trim(); // Only trim, don't lowercase

  console.log("🔍 Extracting features for:", cleanedFilename);

  try {
    const res = await fetch(`http://localhost:5000/extract_features/${cleanedFilename}`);
    const data = await res.json();
    if (res.ok) {
      setFeatures(data.features);
      proceedToResults();
    } else {
      alert("Extraction failed: " + (data.error || "Unknown error"));
    }
  } catch (err) {
    alert("Error extracting features: " + err.message);
  }
};



const analyzeSession = async () => {
  if (!selectedFile) {
    alert("Please select a file.");
    return;
  }

  const cleanedFilename = selectedFile.trim();
  console.log("📊 Requesting analysis for:", cleanedFilename);

  try {
    const res = await fetch(`http://localhost:5000/analyze_session/${cleanedFilename}`);

    if (!res.ok) {
      const errorText = await res.text(); // fallback if not JSON
      console.error("❌ Response not OK:", errorText);
      setAnalysisStatus(`Error: Backend returned ${res.status}`);
      return;
    }

    const data = await res.json(); // only do this if res.ok
    console.log("✅ Analysis result:", data);
    setAnalysisStatus("Session analysis complete.");
    alert("Session analysis complete.");
  } catch (err) {
    setAnalysisStatus("Error: " + err.message);
  }
};



const downloadReport = () => {
  if (!selectedFile) {
    alert("Please select a file.");
    return;
  }
  const reportUrl = `http://localhost:5000/generate_report/${selectedFile}`;
  window.open(reportUrl, "_blank");
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
    navigate('/help');
  };

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, user data, etc.)
    // For now, we'll just navigate to login
    navigate('/login');
  };

  if (currentStep === 2) {
    const navBtnStyle = {
  padding: '8px 16px',
  backgroundColor: '#f07d24',
  color: 'white',
  border: 'none',
  borderRadius: '20px',
  fontSize: '14px',
  cursor: 'pointer'
};

const resultCardStyle = {
  backgroundColor: '#f07d24',
  border: '4px solid white',
  borderRadius: '15px',
  padding: '30px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
};

const resultTextStyle = {
  color: 'white',
  fontSize: '22px',
  fontWeight: '600'
};

const actionBtnStyle = {
  backgroundColor: '#f07d24',
  color: 'white',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '25px',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
};

    return (

<div style={{
    minHeight: '100vh',
    background: '#205c79',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{ width: '100%', maxWidth: '800px' }}>
      {/* Header (unchanged) */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '50px'
      }}>
        <div onClick={handleNavigateToDashboard} style={{
          display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'
        }}>
          <div style={{
            width: '32px', height: '32px', backgroundColor: '#f07d24',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '14px'
          }}>Z</div>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>ZETHETA</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleNavigateToProfile} style={navBtnStyle}>My profile</button>
          <button onClick={handleNavigateToContact} style={navBtnStyle}>Contact</button>
          <button onClick={handleNavigateToHelp} style={navBtnStyle}>Help</button>
          <button onClick={handleLogout} style={navBtnStyle}>Log out</button>
        </div>
      </div>

      {/* Feature Results */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          color: 'white', fontSize: '36px', fontWeight: 'bold', marginBottom: '40px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}>
          Feature Summary
        </h1>

        {features ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={resultCardStyle}>
              <div style={resultTextStyle}>
                Voice Health Score: {features.summary?.overall_voice_health_score?.toFixed(3) ?? 'N/A'}
              </div>
            </div>
            <div style={{ ...resultCardStyle, backgroundColor: '#f69f1c' }}>
              <div style={resultTextStyle}>
                Duration: {features.summary?.audio_duration_seconds?.toFixed(2) ?? 'N/A'} seconds
              </div>
            </div>
            <div style={resultCardStyle}>
              <div style={resultTextStyle}>
                Avg. Pitch: {features.pitch?.average_pitch_hz?.toFixed(2) ?? 'N/A'} Hz
              </div>
            </div>
            <div style={{ ...resultCardStyle, backgroundColor: '#f69f1c' }}>
              <div style={resultTextStyle}>
                Speech Rate: {features.rhythm?.speech_rate_syllables_per_sec?.toFixed(2) ?? 'N/A'} syll/sec
              </div>
            </div>
          </div>
        ) : (
          <div style={{ color: 'white' }}>No feature data available.</div>
        )}
{/* Session Analysis Section */}
<div style={{ marginTop: '40px', textAlign: 'center' }}>
  <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '20px' }}>📋 Session Analysis</h2>
  <p style={{ color: 'white', fontSize: '16px', marginBottom: '20px' }}>
    Analyze full conversation for transcript, emotion, risk profile & generate report.
  </p>
  <button onClick={analyzeSession} style={actionBtnStyle}>
    📊 Analyze Selected File
  </button>
  <button
    onClick={downloadReport}
    style={{
      ...actionBtnStyle,
      marginLeft: '20px',
      backgroundColor: '#28a745'
    }}
  >
    📄 Download Report
  </button>
  {analysisStatus && (
    <p style={{ color: 'white', marginTop: '15px' }}>{analysisStatus}</p>
  )}
</div>

        <div style={{ marginTop: '40px' }}>
          <button onClick={() => setCurrentStep(1)} style={actionBtnStyle}>
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
      background: '#205c79',
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
                backgroundColor: '#f07d24',
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
                backgroundColor: '#f07d24',
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
                backgroundColor: '#f07d24',
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
                  border: '3px dashed white',
                  borderRadius: '15px',
                  padding: '40px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transition: 'background-color 0.3s ease'
                }}>
                  <Upload style={{
                    margin: '0 auto 15px auto',
                    color: 'white',
                    display: 'block'
                  }} size={32} />
                  <span style={{
                    color: 'white',
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
                  color: 'white',
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
            <div style={{ marginBottom: '20px' }}>
  <p style={{ color: 'white', fontSize: '20px', marginBottom: '10px' }}>
    Or record your audio here
  </p>
  <input
    type="text"
    placeholder="Enter custom filename"
    value={customFilename}
    onChange={(e) => setCustomFilename(e.target.value)}
    style={{
      padding: '10px',
      borderRadius: '10px',
      width: '100%',
      border: '1px solid #ccc',
      fontSize: '16px',
      marginBottom: '20px'
    }}
  />
</div>
            <div style={{
              backgroundColor: '#f69f1c',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }}>
              <div style={{
                border: '3px solid white',
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
                  <Mic style={{ color: 'white' }} size={28} />
                  <span style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '600'
                  }}>
                    Record your audio here
                  </span>
                  <button
                    // onClick={toggleRecording}
                    onClick={isRecording ? stopRecording : startRecording}
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
          {/* File Selection Dropdown */}
<div style={{ marginBottom: '30px', marginTop: '20px' }}>
  <p style={{ color: 'white', fontSize: '18px', marginBottom: '10px' }}>
    Or select an uploaded audio file
  </p>
  <select
    value={selectedFile}
    onChange={(e) => setSelectedFile(e.target.value)}
    style={{
      padding: '10px',
      borderRadius: '10px',
      width: '100%',
      fontSize: '16px'
    }}
  >
    <option value="">-- Select File --</option>
    {fileList.map((file) => (
      <option key={file} value={file}>
        {file}
      </option>
    ))}
  </select>
</div>

{/* Action Button */}
{(uploadedFile || recordingTime > 0 || selectedFile) && (
  <button
    onClick={extractFeatures}
    style={{
      backgroundColor: '#f07d24',
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
      e.target.style.backgroundColor = '#f69f1c';
      e.target.style.transform = 'translateY(-2px)';
    }}
    onMouseOut={(e) => {
      e.target.style.backgroundColor = '#f07d24';
      e.target.style.transform = 'translateY(0)';
    }}   
  >
    Analyze Audio
  </button>
)}
          {/* Action Button */}
          {(uploadedFile || recordingTime > 0) && (
            <button
              onClick={extractFeatures}
              style={{
                backgroundColor: '#f07d24',
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
                e.target.style.backgroundColor = '#f69f1c';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#f07d24';
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