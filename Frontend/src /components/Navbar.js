import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <h1>Twitter Clone</h1>
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="navbar-links">
          <li>
            <Link to="/feed">Feed</Link>
          </li>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
          <li>
            <Link to="/messages">Messages</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        {user ? (
          <div className="user-section">
            <div
              className="user-info"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={user.avatar || '/default-avatar.png'}
                alt={`${user.name}'s avatar`}
                className="avatar-small"
              />
              <span>{user.name}</span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to={`/profile/${user.id}`}>Profile</Link>
                  </li>
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="logout-button">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <button onClick={() => navigate('/login')} className="login-button">
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="signup-button"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
