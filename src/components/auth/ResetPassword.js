import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ArrowLeft, Mail, Loader2, AlertCircle, CheckCircle2, Send } from 'lucide-react';

// Constants
const API_ENDPOINTS = {
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  VERIFY_RESET_CODE: '/api/auth/verify-reset-code',
  RESET_PASSWORD: '/api/auth/reset-password'
};

const VALIDATION_RULES = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  resetCode: {
    length: 6,
    pattern: /^[0-9]{6}$/
  },
  password: {
    minLength: 8,
    maxLength: 128,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
  }
};

// Custom Hooks
const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!VALIDATION_RULES.email.pattern.test(value)) {
          return 'Please enter a valid email address';
        }
        return undefined;

      case 'resetCode':
        if (!value.trim()) return 'Reset code is required';
        if (!VALIDATION_RULES.resetCode.pattern.test(value)) {
          return 'Reset code must be 6 digits';
        }
        return undefined;

      case 'newPassword':
        if (!value) return 'New password is required';
        if (value.length < VALIDATION_RULES.password.minLength) {
          return `Password must be at least ${VALIDATION_RULES.password.minLength} characters`;
        }
        if (value.length > VALIDATION_RULES.password.maxLength) {
          return `Password must not exceed ${VALIDATION_RULES.password.maxLength} characters`;
        }
        if (!VALIDATION_RULES.password.pattern.test(value)) {
          return 'Password must contain uppercase, lowercase, number, and special character';
        }
        return undefined;

      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== values.newPassword) {
          return 'Passwords do not match';
        }
        return undefined;

      default:
        return undefined;
    }
  }, [values.newPassword]);

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
class ForgotPasswordService {
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

  static async sendResetEmail(email) {
    // Simulate API call for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email.includes('@')) {
          resolve({
            success: true,
            message: 'Reset code sent successfully!',
            data: { expiresIn: 600 } // 10 minutes
          });
        } else {
          resolve({
            success: false,
            message: 'Email not found',
            errors: { email: 'No account found with this email address' }
          });
        }
      }, 2000);
    });
  }

  static async verifyResetCode(email, code) {
    // Simulate API call for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        if (code === '123456') {
          resolve({
            success: true,
            message: 'Code verified successfully!',
            data: { resetToken: 'mock-reset-token-' + Date.now() }
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid reset code',
            errors: { resetCode: 'The reset code is invalid or has expired' }
          });
        }
      }, 1500);
    });
  }

  static async resetPassword(resetToken, newPassword) {
    // Simulate API call for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Password reset successfully!',
          data: {}
        });
      }, 1500);
    });
  }
}

// Main Component
export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState('email'); // 'email', 'code', 'password', 'success'
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [emailSent, setEmailSent] = useState('');
  
  const emailRef = useRef(null);
  const codeRef = useRef(null);
  const passwordRef = useRef(null);

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
    email: '',
    resetCode: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Focus appropriate field based on current step
    const focusField = () => {
      switch (currentStep) {
        case 'email':
          emailRef.current?.focus();
          break;
        case 'code':
          codeRef.current?.focus();
          break;
        case 'password':
          passwordRef.current?.focus();
          break;
      }
    };

    const timer = setTimeout(focusField, 100);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleEmailSubmit = useCallback(async () => {
    if (!values.email.trim() || errors.email) {
      handleBlur('email');
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');

    try {
      const response = await ForgotPasswordService.sendResetEmail(values.email);

      if (response.success) {
        setEmailSent(values.email);
        setSuccessMessage(response.message);
        setCurrentStep('code');
      } else {
        if (response.errors) {
          setErrors(prev => ({ ...prev, ...response.errors }));
        } else {
          setErrors(prev => ({ ...prev, general: response.message }));
        }
      }
    } catch (error) {
      console.error('Send reset email error:', error);
      setErrors(prev => ({ 
        ...prev, 
        general: 'An unexpected error occurred. Please try again.' 
      }));
    } finally {
      setIsLoading(false);
    }
  }, [values.email, errors.email, handleBlur, setErrors]);

  const handleCodeSubmit = useCallback(async () => {
    if (!values.resetCode.trim() || errors.resetCode) {
      handleBlur('resetCode');
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');

    try {
      const response = await ForgotPasswordService.verifyResetCode(emailSent, values.resetCode);

      if (response.success) {
        setResetToken(response.data.resetToken);
        setSuccessMessage(response.message);
        setCurrentStep('password');
      } else {
        if (response.errors) {
          setErrors(prev => ({ ...prev, ...response.errors }));
        } else {
          setErrors(prev => ({ ...prev, general: response.message }));
        }
      }
    } catch (error) {
      console.error('Verify code error:', error);
      setErrors(prev => ({ 
        ...prev, 
        general: 'An unexpected error occurred. Please try again.' 
      }));
    } finally {
      setIsLoading(false);
    }
  }, [values.resetCode, errors.resetCode, emailSent, handleBlur, setErrors]);

  const handlePasswordSubmit = useCallback(async () => {
    const fieldsToValidate = ['newPassword', 'confirmPassword'];
    let hasErrors = false;

    fieldsToValidate.forEach(field => {
      if (!values[field] || errors[field]) {
        handleBlur(field);
        hasErrors = true;
      }
    });

    if (hasErrors || values.newPassword !== values.confirmPassword) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');

    try {
      const response = await ForgotPasswordService.resetPassword(resetToken, values.newPassword);

      if (response.success) {
        setSuccessMessage(response.message);
        setCurrentStep('success');
      } else {
        if (response.errors) {
          setErrors(prev => ({ ...prev, ...response.errors }));
        } else {
          setErrors(prev => ({ ...prev, general: response.message }));
        }
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setErrors(prev => ({ 
        ...prev, 
        general: 'An unexpected error occurred. Please try again.' 
      }));
    } finally {
      setIsLoading(false);
    }
  }, [values.newPassword, values.confirmPassword, errors.newPassword, errors.confirmPassword, resetToken, handleBlur, setErrors]);

  const handleBackToLogin = useCallback(() => {
    console.log('Navigate back to login');
    alert('Navigate back to login - integrate with your routing system');
  }, []);

  const handleBackToEmail = useCallback(() => {
    setCurrentStep('email');
    setSuccessMessage('');
    setErrors({});
  }, [setErrors]);

  const handleResendCode = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ForgotPasswordService.sendResetEmail(emailSent);
      if (response.success) {
        setSuccessMessage('Reset code resent successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Resend error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [emailSent]);

  const getFieldError = (fieldName) => {
    return (touched[fieldName] || currentStep !== 'email') ? errors[fieldName] : undefined;
  };

  const handleKeyPress = useCallback((e, step) => {
    if (e.key === 'Enter') {
      switch (step) {
        case 'email':
          handleEmailSubmit();
          break;
        case 'code':
          handleCodeSubmit();
          break;
        case 'password':
          handlePasswordSubmit();
          break;
      }
    }
  }, [handleEmailSubmit, handleCodeSubmit, handlePasswordSubmit]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 'email':
        return (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}>
                <Mail size={32} color="white" />
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '12px',
                margin: '0 0 12px 0',
                fontFamily: 'Archivo Black, sans-serif'
              }}>Reset Password</h2>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '16px',
                margin: 0,
                fontFamily: 'Poppins, sans-serif'
              }}>
                Enter your email address and we'll send you a reset code
              </p>
            </div>

            <div>
              <label style={{
                display: 'block',
                color: 'white',
                fontWeight: '600',
                marginBottom: '8px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Email Address <span style={{ color: '#fecaca' }}>*</span>
              </label>
              <input
                ref={emailRef}
                type="email"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                onKeyPress={(e) => handleKeyPress(e, 'email')}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  color: '#374151',
                  backgroundColor: getFieldError('email') ? '#fef2f2' : 'white',
                  boxShadow: getFieldError('email') 
                    ? '0 0 0 2px rgba(239, 68, 68, 0.2)' 
                    : 'none',
                  transition: 'all 0.2s',
                  opacity: isLoading ? 0.5 : 1,
                  cursor: isLoading ? 'not-allowed' : 'text',
                  boxSizing: 'border-box',
                  fontFamily: 'Poppins, sans-serif'
                }}
                placeholder="Enter your email address"
                autoComplete="email"
              />
              {getFieldError('email') && (
                <p style={{
                  marginTop: '8px',
                  color: '#fecaca',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  margin: '8px 0 0 0'
                }}>
                  <AlertCircle style={{ width: '16px', height: '16px', marginRight: '4px', flexShrink: 0 }} />
                  {getFieldError('email')}
                </p>
              )}
            </div>

            <button
              onClick={handleEmailSubmit}
              disabled={isLoading}
              style={{
                width: '100%',
                background: isLoading ? '#d1d5db' : '#f69f1c',
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
                fontFamily: 'Poppins, sans-serif',
                marginTop: '24px'
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
                  Sending Reset Code...
                </>
              ) : (
                <>
                  <Send style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                  Send Reset Code
                </>
              )}
            </button>
          </>
        );

      case 'code':
        return (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}>
                <Mail size={32} color="white" />
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '12px',
                margin: '0 0 12px 0',
                fontFamily: 'Archivo Black, sans-serif'
              }}>Enter Reset Code</h2>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '16px',
                margin: 0,
                fontFamily: 'Poppins, sans-serif'
              }}>
                We've sent a 6-digit code to {emailSent}
              </p>
            </div>

            <div>
              <label style={{
                display: 'block',
                color: 'white',
                fontWeight: '600',
                marginBottom: '8px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Reset Code <span style={{ color: '#fecaca' }}>*</span>
              </label>
              <input
                ref={codeRef}
                type="text"
                value={values.resetCode}
                onChange={(e) => handleChange('resetCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                onBlur={() => handleBlur('resetCode')}
                onKeyPress={(e) => handleKeyPress(e, 'code')}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '20px',
                  color: '#374151',
                  backgroundColor: getFieldError('resetCode') ? '#fef2f2' : 'white',
                  boxShadow: getFieldError('resetCode') 
                    ? '0 0 0 2px rgba(239, 68, 68, 0.2)' 
                    : 'none',
                  transition: 'all 0.2s',
                  opacity: isLoading ? 0.5 : 1,
                  cursor: isLoading ? 'not-allowed' : 'text',
                  boxSizing: 'border-box',
                  fontFamily: 'Poppins, sans-serif',
                  textAlign: 'center',
                  letterSpacing: '0.1em'
                }}
                placeholder="123456"
                maxLength="6"
              />
              {getFieldError('resetCode') && (
                <p style={{
                  marginTop: '8px',
                  color: '#fecaca',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  margin: '8px 0 0 0'
                }}>
                  <AlertCircle style={{ width: '16px', height: '16px', marginRight: '4px', flexShrink: 0 }} />
                  {getFieldError('resetCode')}
                </p>
              )}
            </div>

            <button
              onClick={handleCodeSubmit}
              disabled={isLoading}
              style={{
                width: '100%',
                background: isLoading ? '#d1d5db' : '#f69f1c',
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
                fontFamily: 'Poppins, sans-serif',
                marginTop: '24px'
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
                  Verifying Code...
                </>
              ) : (
                'Verify Code'
              )}
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}>
                Didn't receive the code?{' '}
              </span>
              <button
                onClick={handleResendCode}
                disabled={isLoading}
                style={{
                  color: 'white',
                  background: 'none',
                  border: 'none',
                  textDecoration: 'underline',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontFamily: 'Poppins, sans-serif',
                  opacity: isLoading ? 0.5 : 1
                }}
              >
                Resend Code
              </button>
            </div>
          </>
        );

      case 'password':
        return (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '12px',
                margin: '0 0 12px 0',
                fontFamily: 'Archivo Black, sans-serif'
              }}>Set New Password</h2>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '16px',
                margin: 0,
                fontFamily: 'Poppins, sans-serif'
              }}>
                Create a strong password for your account
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontWeight: '600',
                  marginBottom: '8px',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  New Password <span style={{ color: '#fecaca' }}>*</span>
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  value={values.newPassword}
                  onChange={(e) => handleChange('newPassword', e.target.value)}
                  onBlur={() => handleBlur('newPassword')}
                  onKeyPress={(e) => handleKeyPress(e, 'password')}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '8px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    color: '#374151',
                    backgroundColor: getFieldError('newPassword') ? '#fef2f2' : 'white',
                    boxShadow: getFieldError('newPassword') 
                      ? '0 0 0 2px rgba(239, 68, 68, 0.2)' 
                      : 'none',
                    transition: 'all 0.2s',
                    opacity: isLoading ? 0.5 : 1,
                    cursor: isLoading ? 'not-allowed' : 'text',
                    boxSizing: 'border-box',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                  placeholder="Enter new password"
                />
                {getFieldError('newPassword') && (
                  <p style={{
                    marginTop: '8px',
                    color: '#fecaca',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    margin: '8px 0 0 0'
                  }}>
                    <AlertCircle style={{ width: '16px', height: '16px', marginRight: '4px', flexShrink: 0 }} />
                    {getFieldError('newPassword')}
                  </p>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontWeight: '600',
                  marginBottom: '8px',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  Confirm Password <span style={{ color: '#fecaca' }}>*</span>
                </label>
                <input
                  type="password"
                  value={values.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  onKeyPress={(e) => handleKeyPress(e, 'password')}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '8px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    color: '#374151',
                    backgroundColor: getFieldError('confirmPassword') ? '#fef2f2' : 'white',
                    boxShadow: getFieldError('confirmPassword') 
                      ? '0 0 0 2px rgba(239, 68, 68, 0.2)' 
                      : 'none',
                    transition: 'all 0.2s',
                    opacity: isLoading ? 0.5 : 1,
                    cursor: isLoading ? 'not-allowed' : 'text',
                    boxSizing: 'border-box',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                  placeholder="Confirm new password"
                />
                {getFieldError('confirmPassword') && (
                  <p style={{
                    marginTop: '8px',
                    color: '#fecaca',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    margin: '8px 0 0 0'
                  }}>
                    <AlertCircle style={{ width: '16px', height: '16px', marginRight: '4px', flexShrink: 0 }} />
                    {getFieldError('confirmPassword')}
                  </p>
                )}
              </div>
            </div>

            <div style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '14px',
                margin: '0 0 8px 0',
                fontWeight: '600',
                fontFamily: 'Poppins, sans-serif'
              }}>Password Requirements:</p>
              <ul style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '13px',
                margin: 0,
                paddingLeft: '20px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                <li>At least 8 characters long</li>
                <li>Contains uppercase and lowercase letters</li>
                <li>Contains at least one number</li>
                <li>Contains at least one special character (@$!%*?&)</li>
              </ul>
            </div>

            <button
              onClick={handlePasswordSubmit}
              disabled={isLoading}
              style={{
                width: '100%',
                background: isLoading ? '#d1d5db' : '#f69f1c',
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
                fontFamily: 'Poppins, sans-serif',
                marginTop: '24px'
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
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </>
        );

      case 'success':
        return (
          <>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#dcfce7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                border: '2px solid #4ade80'
              }}>
                <CheckCircle2 size={32} color="#166534" />
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '12px',
                margin: '0 0 12px 0',
                fontFamily: 'Archivo Black, sans-serif'
              }}>Password Reset Successfully!</h2>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '16px',
                margin: '0 0 32px 0',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Your password has been reset successfully. You can now log in with your new password.
              </p>

              <button
                onClick={handleBackToLogin}
                style={{
                  width: '100%',
                  background: '#f69f1c',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '16px 24px',
                  borderRadius: '25px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#e5941a';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#f69f1c';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Back to Login
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

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
      {/* Main Content */}
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '500px'
      }}>
        {/* Back Button */}
        {currentStep !== 'success' && (
          <div style={{
            alignSelf: 'flex-start',
            marginBottom: '24px'
          }}>
            <button
              onClick={currentStep === 'email' ? handleBackToLogin : handleBackToEmail}
              disabled={isLoading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'white',
                background: 'transparent',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontFamily: 'Poppins, sans-serif',
                opacity: isLoading ? 0.5 : 1,
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.target.style.textDecoration = 'underline';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.target.style.textDecoration = 'none';
                }
              }}
            >
              <ArrowLeft size={20} />
              {currentStep === 'email' ? 'Back to Login' : 'Back'}
            </button>
          </div>
        )}

        {/* Progress Indicator */}
        {currentStep !== 'success' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            width: '100%'
          }}>
            {['email', 'code', 'password'].map((step, index) => (
              <React.Fragment key={step}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: currentStep === step || (step === 'code' && (currentStep === 'password' || currentStep === 'success')) || (step === 'password' && currentStep === 'success') 
                    ? '#f69f1c' 
                    : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'all 0.3s'
                }}>
                  {index + 1}
                </div>
                {index < 2 && (
                  <div style={{
                    width: '60px',
                    height: '2px',
                    backgroundColor: (step === 'email' && (currentStep === 'code' || currentStep === 'password')) || (step === 'code' && currentStep === 'password')
                      ? '#f69f1c'
                      : 'rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s'
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Form Container */}
        <div style={{
          background: '#f07d24',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '400px'
        }}>
          {/* Success Message */}
          {successMessage && currentStep !== 'success' && (
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

          {renderStepContent()}
        </div>

        {/* Demo Info */}
        {currentStep === 'code' && (
          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center'
          }}>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px',
              margin: 0,
              fontFamily: 'Poppins, sans-serif'
            }}>
              <strong>Demo:</strong> Use code <strong>123456</strong> to proceed
            </p>
          </div>
        )}
      </main>
    </div>
  );
}