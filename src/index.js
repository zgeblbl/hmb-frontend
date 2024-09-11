import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';  // Import SignIn component
import ForgotPassword from './ForgotPassword';  // Import ForgotPassword component
import reportWebVitals from './reportWebVitals';
import HomePage from './HomePage';
import UserQuery from './UserQuery';
import LeaveApplication from './LeaveApplication';
import Contact from './Contact';
import ProfileSettings from './ProfileSettings';
import AdminHome from './AdminHome';
import AddUser from './AddUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />  {/* Route for SignIn */}
        <Route path="/forgot-password" element={<ForgotPassword />} />  {/* Route for ForgotPassword */}
        <Route path="/home" element={<HomePage />} />  {/* Route for HomePage */}
        <Route path="/userquery" element={<UserQuery />} />
        <Route path="/leaveapplication" element={<LeaveApplication />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile-settings" element={<ProfileSettings/>} />
        <Route path="/admin-home" element={<AdminHome/>} />
        <Route path="/add-user" element={<AddUser/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
