// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

/**
 * Main application component that sets up routing and navigation.
 *
 * Features:
 * - Home Page: Displays the main content of the application.
 * - Login Page: Allows users to log in to their accounts.
 * - Register Page: Allows new users to create an account.
 * - Forgot Password Page: Allows users to reset their password if forgotten.
 * - Reset Password Page: Allows users to reset their password using a token.
 */
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
