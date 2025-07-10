
import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Registration data:', formData);
      // Handle registration logic here
      alert('Registration successful! (This is a demo)');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#205c79' }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Archivo+Black&display=swap');
        
        .poppins {
          font-family: 'Poppins', sans-serif;
        }
        
        .archivo-black {
          font-family: 'Archivo Black', sans-serif;
        }
      `}</style>

      {/* Main Content */}
      <div className="relative flex items-center justify-center px-6 py-12 min-h-screen">  
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 archivo-black">
              Voice-Analysis Risk Profiler
            </h1>
            <p className="text-xl text-white/90 poppins">
              Revolutionizing Security Through Vocal Intelligence
            </p>
          </div>

          {/* Registration Form */}
          <div className="rounded-3xl p-8 shadow-2xl" style={{ backgroundColor: '#f07d24' }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 archivo-black">CREATE ACCOUNT</h2>
              <p className="text-white/90 poppins">Join us to get started</p>
            </div>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-white font-semibold mb-2 poppins">
                  <User className="inline w-4 h-4 mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:outline-none transition-colors poppins"
                  style={{ 
                    focusRing: '#f69f1c',
                    backgroundColor: 'white'
                  }}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-200 text-sm mt-1 flex items-center poppins">
                    <span className="w-4 h-4 mr-1">⚠</span>
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="block text-white font-semibold mb-2 poppins">
                  <User className="inline w-4 h-4 mr-2" />
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:outline-none transition-colors poppins"
                  style={{ backgroundColor: 'white' }}
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <p className="text-red-200 text-sm mt-1 flex items-center poppins">
                    <span className="w-4 h-4 mr-1">⚠</span>
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2 poppins">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:outline-none transition-colors poppins"
                    style={{ backgroundColor: 'white' }}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-200 text-sm mt-1 flex items-center poppins">
                      <span className="w-4 h-4 mr-1">⚠</span>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2 poppins">
                    <Phone className="inline w-4 h-4 mr-2" />
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:outline-none transition-colors poppins"
                    style={{ backgroundColor: 'white' }}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-200 text-sm mt-1 flex items-center poppins">
                      <span className="w-4 h-4 mr-1">⚠</span>
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Date of Birth and Gender Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2 poppins">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:outline-none transition-colors poppins"
                    style={{ backgroundColor: 'white' }}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-200 text-sm mt-1 flex items-center poppins">
                      <span className="w-4 h-4 mr-1">⚠</span>
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2 poppins">
                    <Users className="inline w-4 h-4 mr-2" />
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:outline-none transition-colors poppins"
                    style={{ backgroundColor: 'white' }}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-200 text-sm mt-1 flex items-center poppins">
                      <span className="w-4 h-4 mr-1">⚠</span>
                      {errors.gender}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-white font-semibold mb-2 poppins">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-0 focus:ring-2 focus:outline-none transition-colors poppins"
                    style={{ backgroundColor: 'white' }}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-200 text-sm mt-1 flex items-center poppins">
                    <span className="w-4 h-4 mr-1">⚠</span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-white font-semibold mb-2 poppins">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-0 focus:ring-2 focus:outline-none transition-colors poppins"
                    style={{ backgroundColor: 'white' }}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-200 text-sm mt-1 flex items-center poppins">
                    <span className="w-4 h-4 mr-1">⚠</span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white py-4 rounded-xl font-bold text-lg transition-colors duration-200 shadow-lg poppins"
                style={{ 
                  backgroundColor: '#f69f1c',
                  ':hover': { backgroundColor: '#e89010' }
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e89010'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f69f1c'}
              >
                CREATE ACCOUNT
              </button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-white poppins">
                  Already have an account?{' '}
                  <Link to="/login" className="text-white font-semibold underline hover:opacity-80 transition-opacity">
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;