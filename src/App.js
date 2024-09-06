import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import HomePage from './HomePage';
import UserQuery from './UserQuery';
import Deneme from './Deneme';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user-query" element={<UserQuery />} />
        <Route path="/deneme" element={<Deneme />} />
      </Routes>
    </Router>
  );
}

export default App;
