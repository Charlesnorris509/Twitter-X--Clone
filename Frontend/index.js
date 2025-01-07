// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './style/Index.css';
import App from './App';

/**
 * Entry point of the React application.
 * This file is responsible for rendering the App component into the DOM.
 *
 * Features:
 * - Imports global CSS styles from Tailwind.
 * - Utilizes React's StrictMode for highlighting potential problems.
 * - Renders the main App component, which sets up routing and navigation.
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
