// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import pages
import Homepage from './components/public/Homepage';
import About from './components/public/About';
import ContactUs from './components/public/ContactUs';
import PrivacyPolicy from './components/public/PrivacyPolicy';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

import Dashboard from './components/user/Dashboard';
import Profile from './components/user/Profile';
import MainFeature from './components/user/MainFeature';
import Help from './components/user/Help'; // Add this import

import NotFound from './components/errors/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* User Core */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/feature" element={<MainFeature />} />
      <Route path="/help" element={<Help />} />
      

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
