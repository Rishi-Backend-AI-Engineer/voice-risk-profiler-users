// // src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes'; // Assuming this includes main app routes
import ForgotPassword from './components/auth/ResetPassword'; // Ensure correct path

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// src/routes.js
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import ForgotPassword from './components/auth/ResetPasswordPassword'; // or ResetPassword
// // ... other imports

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add this line */}
//       {/* ... other routes */}
//     </Routes>
//   );
// }

// export default AppRoutes;