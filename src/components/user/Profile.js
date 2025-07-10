
import React, { useState, useEffect, useCallback } from 'react';
import { X, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

// API Service Layer
const ApiService = {
  getUserProfile: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: userId,
            fullName: '',
            username: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            gender: '',
            profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            accountType: '',
            accountCreated: '',
            lastLogin: '',
            accountStatus: '',
            language: '',
            theme: '',
            twoFactorEnabled: false,
            emailNotifications: false,
            smsNotifications: false,
            recentLogin: ''
          }
        });
      }, 1000);
    });
  },

  updateUserProfile: async (userId, profileData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve({
            success: true,
            message: 'Profile updated successfully',
            data: profileData
          });
        } else {
          reject({
            success: false,
            message: 'Failed to update profile. Please try again.'
          });
        }
      }, 1500);
    });
  },

  changePassword: async (userId, passwordData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve({
            success: true,
            message: 'Password changed successfully'
          });
        } else {
          reject({
            success: false,
            message: 'Current password is incorrect'
          });
        }
      }, 1000);
    });
  }
};

// Custom Hooks
const useUserProfile = (userId) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getUserProfile(userId);
      setProfile(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId, fetchProfile]);

  return { profile, loading, error };
};

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2`} style={{fontFamily: 'Poppins, sans-serif'}}>
      <Icon size={20} />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X size={16} />
      </button>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen" style={{backgroundColor: '#205c79'}}>
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-white mb-4 mx-auto" />
      <p className="text-white" style={{fontFamily: 'Poppins, sans-serif'}}>Loading profile...</p>
    </div>
  </div>
);

// Profile Row Component
const ProfileRow = ({ label, value, link = false, action = null }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
    <span className="text-gray-700 font-medium" style={{fontFamily: 'Poppins, sans-serif'}}>{label}</span>
    <div className="flex items-center space-x-2">
      <span className={`text-gray-900 ${link ? 'hover:underline' : ''}`} style={{color: link ? '#4A90A4' : '#374151', cursor: link ? 'pointer' : 'default', fontFamily: 'Poppins, sans-serif'}}>
        {value || 'Not set'}
      </span>
      {action && (
        <button className="hover:underline text-sm font-medium transition-colors" style={{color: '#FF8C42', fontFamily: 'Poppins, sans-serif'}}>
          {action}
        </button>
      )}
    </div>
  </div>
);

// Section Component
const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily: 'Archivo Black, sans-serif', color: '#4A90A4'}}>{title}</h2>
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4">
        {children}
      </div>
    </div>
  </div>
);

// Main Component
export default function Profile() {
  const [userId] = useState('user123');
  const { profile, loading, error } = useUserProfile(userId);
  const [toast, setToast] = useState(null);

  // Render States
  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading profile</div>;
  if (!profile) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Matching Project Background */}
      <div className="absolute inset-0" style={{backgroundColor: '#205c79'}}>
        {/* Geometric Shapes with Matching Colors */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-15 -translate-x-48 -translate-y-48" style={{backgroundColor: '#1A4D63'}}></div>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 translate-x-40 -translate-y-40" style={{backgroundColor: '#FF8C42'}}></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 rounded-full opacity-15 -translate-x-36 translate-y-36" style={{backgroundColor: '#2A6C89'}}></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10 translate-x-32 translate-y-32" style={{backgroundColor: '#FF9A56'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-95">
          
          {/* Profile Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4" style={{borderColor: '#FF8C42'}}>
                <img
                  src={profile.profileImage}
                  alt={profile.fullName || 'Profile'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1" style={{fontFamily: 'Archivo Black, sans-serif', color: '#4A90A4'}}>{profile.fullName || 'User Name'}</h1>
                <p className="text-gray-600" style={{fontFamily: 'Poppins, sans-serif'}}>@{profile.username || 'username'}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            {/* Basic Information */}
            <Section title="Basic Information">
              <div className="space-y-0">
                <ProfileRow label="Full Name" value={profile.fullName} />
                <ProfileRow label="Username" value={profile.username} />
                <ProfileRow label="Email" value={profile.email} link />
                <ProfileRow label="Phone" value={profile.phone} />
                <ProfileRow label="Date of Birth" value={profile.dateOfBirth} />
                <ProfileRow label="Gender" value={profile.gender} />
              </div>
            </Section>

            {/* Account Details */}
            <Section title="Account Details">
              <div className="space-y-0">
                <ProfileRow label="Account Type" value={profile.accountType} />
                <ProfileRow label="Account Created" value={profile.accountCreated} />
                <ProfileRow label="Last Login" value={profile.lastLogin} />
                <ProfileRow label="Account Status" value={profile.accountStatus} />
              </div>
            </Section>

            {/* Security Settings */}
            <Section title="Security Settings">
              <div className="space-y-0">
                <ProfileRow label="Change Password" value="" action="Edit" />
                <ProfileRow label="Two-Factor Authentication" value={profile.twoFactorEnabled ? "Enabled" : "Disabled"} action="Edit" />
                <ProfileRow label="Recent Login" value={profile.recentLogin} />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}