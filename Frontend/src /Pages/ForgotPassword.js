import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css'; // Import the CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // TODO: Implement forgot password logic here
      // This would typically:
      // 1. Call your API to send a reset email
      // 2. Handle the response
      console.log('Password reset requested for:', email);
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
            <p className="text-gray-600">
              We've sent password reset instructions to {email}
            </p>
          </div>
          <div className="mt-4">
            <Link
              to="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

 return (
  <div className="container">
    <div className="card">
      <h2 className="title">Forgot your password?</h2>
      <p className="subtitle">
        Enter your email address and we'll send you instructions to reset your password.
      </p>
      {error && <div className="alert">{error}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="input"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="button">
          Send Reset Instructions
        </button>
      </form>
      <Link to="/login" className="link">
        Back to login
      </Link>
    </div>
  </div>
);

export default ForgotPassword;
