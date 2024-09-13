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
import AdminQuery from './AdminQuery';
import AdminMessage from './AdminMessage';
import AdminSettings from './AdminSettings';
import AddUser from './AddUser';
import LeaveRequestManagement from './LeaveRequestManagement';

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
        <Route path="/admin-query" element={<AdminQuery/>} />
        <Route path="/admin-message" element={<AdminMessage/>} />
        <Route path="/admin-settings" element={<AdminSettings/>} />
        <Route path="/add-user" element={<AddUser/>} />
        <Route path="/leave-request-management" element={<LeaveRequestManagement/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
