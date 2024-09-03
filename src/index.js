import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';  // Import SignIn component
import ForgotPassword from './ForgotPassword';  // Import ForgotPassword component
import reportWebVitals from './reportWebVitals';
import HomePage from './HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />  {/* Route for SignIn */}
        <Route path="/forgot-password" element={<ForgotPassword />} />  {/* Route for ForgotPassword */}
        <Route path="/home" element={<HomePage />} />  {/* Route for HomePage */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
