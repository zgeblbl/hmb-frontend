import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App'; // Import your App component
import Deneme from './Deneme';

const Profile = () => <h2>Profile Page</h2>;
const MyAccount = () => <h2>My Account Page</h2>;
const Logout = () => <h2>Logout Page</h2>;

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/deneme" element={<Deneme />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default Main;