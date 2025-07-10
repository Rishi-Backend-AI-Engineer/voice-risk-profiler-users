import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

// Constants
const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  REFRESH: '/api/auth/refresh',
  UPLOAD: '/upload',
  LIST_FILES: '/list_files',
  EXTRACT_FEATURES: '/extract_features',
  ANALYZE: '/analyze',
  GENERATE_REPORT: '/generate_report',
  SESSIONS: '/sessions',
  STATIC_FILES: '/'
};

const VALIDATION_RULES = {
  username: {
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9_.-]+$/
  },
  password: {
    minLength: 8,
    maxLength: 128
  }
};

// Custom Hooks
const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'username':
        if (!value.trim()) return 'Username is required';
        if (value.length < VALIDATION_RULES.username.minLength) {
          return `Username must be at least ${VALIDATION_RULES.username.minLength} characters`;
        }
        if (value.length > VALIDATION_RULES.username.maxLength) {
          return `Username must not exceed ${VALIDATION_RULES.username.maxLength} characters`;
        }
        if (!VALIDATION_RULES.username.pattern.test(value)) {
          return 'Username can only contain letters, numbers, dots, hyphens, and underscores';
        }
        return undefined;

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < VALIDATION_RULES.password.minLength) {
          return `Password must be at least ${VALIDATION_RULES.password.minLength} characters`;
        }
        if (value.length > VALIDATION_RULES.password.maxLength) {
          return `Password must not exceed ${VALIDATION_RULES.password.maxLength} characters`;
        }
        return undefined;

      default:
        return undefined;
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField, values]);

  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  }, [initialState]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setErrors
  };
};

// API Service
class AuthService {
  static async makeRequest(endpoint, options) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'An error occurred',
          errors: data.errors || {}
        };
      }

      return {
        success: true,
        message: data.message || 'Success',
        data: data.data
      };
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.',
        errors: {}
      };
    }
  }

  static async login(credentials) {
    // For demo purposes, simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.username === 'demo' && credentials.password === 'password123') {
          resolve({
            success: true,
            message: 'Login successful!',
            data: {
              token: 'mock-jwt-token-' + Date.now(),
              user: {
                id: 1,
                username: credentials.username,
                email: 'demo@zetheta.com'
              }
            }
          });
        } else if (credentials.username === 'admin' && credentials.password === 'admin123456') {
          resolve({
            success: true,
            message: 'Admin login successful!',
            data: {
              token: 'mock-admin-token-' + Date.now(),
              user: {
                id: 2,
                username: credentials.username,
                email: 'admin@zetheta.com',
                role: 'admin'
              }
            }
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid credentials',
            errors: {
              general: 'Username or password is incorrect'
            }
          });
        }
      }, 1500);
    });
  }

  static async register(userData) {
    return this.makeRequest(API_ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
}

// Main Component
export default function VoiceAnalysisLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const usernameRef = useRef(null);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setErrors
  } = useFormValidation({
    username: '',
    password: ''
  });

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    setSubmitAttempted(true);
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await AuthService.login(values);

      if (response.success) {
        setSuccessMessage(response.message);
        
        console.log('Login successful:', response.data);
        
        setTimeout(() => {
          resetForm();
          setSubmitAttempted(false);
          setSuccessMessage('');
        }, 3000);

      } else {
        if (response.errors) {
          setErrors(prev => ({ ...prev, ...response.errors }));
        }
        
        if (response.message && !response.errors.general) {
          setErrors(prev => ({ ...prev, general: response.message }));
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({ 
        ...prev, 
        general: 'An unexpected error occurred. Please try again.' 
      }));
    } finally {
      setIsLoading(false);
    }
  }, [values, validateForm, setErrors, resetForm]);

  const handleRegisterClick = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  const handleForgotPasswordClick = useCallback(() => {
  navigate('/reset-password');
}, [navigate]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const getFieldError = (fieldName) => {
    return (touched[fieldName] || submitAttempted) ? errors[fieldName] : undefined;
  };

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#205c79',
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      {/* Header */}
      <header style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 48px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#f07d24',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}> */}
            {/* <span style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px',
              fontFamily: 'Archivo Black, sans-serif'
            }}>Z</span> */}
          {/* </div> */}
          {/* <span style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            letterSpacing: '0.05em',
            fontFamily: 'Archivo Black, sans-serif'
          }}>ZETHETA</span> */}
        </div>
        {/* <nav style={{ display: 'flex', gap: '16px' }}>
          {['About', 'Contact', 'Login', 'Sign Up'].map((item, index) => (
            <button
              key={item}
              style={{
                color: 'white',
                padding: '12px 24px',
                borderRadius: '25px',
                border: 'none',
                background: index === 3 ? '#f07d24' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '500'
              }}
              onMouseOver={(e) => {
                if (index !== 3) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                } else {
                  e.target.style.backgroundColor = '#f69f1c';
                }
              }}
              onMouseOut={(e) => {
                if (index !== 3) {
                  e.target.style.backgroundColor = 'transparent';
                } else {
                  e.target.style.backgroundColor = '#f07d24';
                }
              }}
            >
              {item}
            </button>
          ))}
        </nav> */}
      </header>

      {/* Main Content */}
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '500px'
      }}>
        {/* Title Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '24px',
            margin: '0 0 24px 0',
            fontFamily: 'Archivo Black, sans-serif',
            lineHeight: '1.1'
          }}>
            Voice-Analysis Risk Profiler
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: 0,
            fontFamily: 'Poppins, sans-serif'
          }}>
            Revolutionizing Security Through Vocal Intelligence
          </p>
        </div>

        {/* Login Form */}
        <div style={{
          background: '#f07d24',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '32px',
            margin: '0 0 32px 0',
            fontFamily: 'Archivo Black, sans-serif'
          }}>Login here</h2>
          
          {/* Success Message */}
          {successMessage && (
            <div style={{
              marginBottom: '24px',
              padding: '16px',
              backgroundColor: '#dcfce7',
              border: '1px solid #4ade80',
              color: '#166534',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <CheckCircle2 style={{ width: '20px', height: '20px', marginRight: '8px', flexShrink: 0 }} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* General Error */}
          {errors.general && (
            <div style={{
              marginBottom: '24px',
              padding: '16px',
              backgroundColor: '#fef2f2',
              border: '1px solid #f87171',
              color: '#dc2626',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <AlertCircle style={{ width: '20px', height: '20px', marginRight: '8px', flexShrink: 0 }} />
              <span>{errors.general}</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Username Field */}
            <div>
              <label style={{
                display: 'block',
                color: 'white',
                fontWeight: '600',
                marginBottom: '8px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Username <span style={{ color: '#fecaca' }}>*</span>
              </label>
              <input
                ref={usernameRef}
                type="text"
                value={values.username}
                onChange={(e) => handleChange('username', e.target.value)}
                onBlur={() => handleBlur('username')}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  color: '#374151',
                  backgroundColor: getFieldError('username') ? '#fef2f2' : 'white',
                  boxShadow: getFieldError('username') 
                    ? '0 0 0 2px rgba(239, 68, 68, 0.2)' 
                    : 'none',
                  transition: 'all 0.2s',
                  opacity: isLoading ? 0.5 : 1,
                  cursor: isLoading ? 'not-allowed' : 'text',
                  boxSizing: 'border-box',
                  fontFamily: 'Poppins, sans-serif'
                }}
                placeholder="Enter your username"
                autoComplete="username"
              />
              {getFieldError('username') && (
                <p style={{
                  marginTop: '8px',
                  color: '#fecaca',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  margin: '8px 0 0 0'
                }}>
                  <AlertCircle style={{ width: '16px', height: '16px', marginRight: '4px', flexShrink: 0 }} />
                  {getFieldError('username')}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label style={{
                display: 'block',
                color: 'white',
                fontWeight: '600',
                marginBottom: '8px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Password <span style={{ color: '#fecaca' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '16px 48px 16px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    color: '#374151',
                    backgroundColor: getFieldError('password') ? '#fef2f2' : 'white',
                    boxShadow: getFieldError('password') 
                      ? '0 0 0 2px rgba(239, 68, 68, 0.2)' 
                      : 'none',
                    transition: 'all 0.2s',
                    opacity: isLoading ? 0.5 : 1,
                    cursor: isLoading ? 'not-allowed' : 'text',
                    boxSizing: 'border-box',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6b7280',
                    border: 'none',
                    background: 'transparent',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1,
                    padding: '4px',
                    borderRadius: '4px'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {getFieldError('password') && (
                <p style={{
                  marginTop: '8px',
                  color: '#fecaca',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  margin: '8px 0 0 0'
                }}>
                  <AlertCircle style={{ width: '16px', height: '16px', marginRight: '4px', flexShrink: 0 }} />
                  {getFieldError('password')}
                </p>
              )}
              
              {/* Forgot Password Link */}
              <div style={{ textAlign: 'right', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={handleForgotPasswordClick}
                  disabled={isLoading}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '14px',
                    textDecoration: 'underline',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.6 : 1,
                    fontFamily: 'Poppins, sans-serif',
                    padding: '4px 0'
                  }}
                  onMouseOver={(e) => {
                    if (!isLoading) {
                      e.target.style.color = 'white';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isLoading) {
                      e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                    }
                  }}
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                width: '100%',
                background: isLoading 
                  ? '#d1d5db' 
                  : '#f69f1c',
                color: isLoading ? '#6b7280' : 'white',
                fontWeight: 'bold',
                padding: '16px 24px',
                borderRadius: '25px',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontFamily: 'Poppins, sans-serif'
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.target.style.background = '#e5941a';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.target.style.background = '#f69f1c';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 style={{ width: '20px', height: '20px', marginRight: '8px' }} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>

        {/* Register Link */}
        <div style={{ marginTop: '32px' }}>
          <button 
            onClick={handleRegisterClick}
            disabled={isLoading}
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '25px',
              fontWeight: '500',
              border: '2px solid white',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: isLoading ? 0.6 : 1,
              fontFamily: 'Poppins, sans-serif'
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#205c79';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'white';
              }
            }}
          >
            Don't have an account? Register here
          </button>
        </div>
      </main>
    </div>
  );
}