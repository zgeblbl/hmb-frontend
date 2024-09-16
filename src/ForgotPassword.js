import React, { useState } from 'react';
import './ForgotPassword.css';
import logoo from './media/logo.svg';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate a password reset request
      setMessage(language === 'en' ? "Password reset link sent to your email!" : "Şifre sıfırlama bağlantısı e-postanıza gönderildi!");
    } else {
      setMessage(language === 'en' ? "Please enter your email address." : "Lütfen e-posta adresinizi girin.");
    }
  };

  const handleBackToSignIn = () => {
    navigate('/');
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };
  const logo = logoo;

  return (
    <div className="ForgotPassword">
      <header className="App-header">
        <div className="panel">
        <img src={logo} className="App-logo" alt="logo" />
          <h2>{language === 'en' ? 'Forgot Password' : 'Şifremi Unuttum'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'en' ? 'Enter your email' : 'E-posta adresinizi girin'}
              required
            />
            <button type="submit">{language === 'en' ? 'Send Reset Link' : 'Bağlantıyı Gönder'}</button>
            {message && <p className="message">{message}</p>}
          </form>
          <button onClick={handleBackToSignIn} className="back-button">
            {language === 'en' ? 'Back to Sign In' : 'Giriş Yap Sayfasına Dön'}
          </button>
        </div>
        <div className="language-buttons">
          <button onClick={() => handleLanguageChange('en')}>English</button>
          <button onClick={() => handleLanguageChange('tr')}>Türkçe</button>
        </div>
      </header>
    </div>
  );
}

export default ForgotPassword;
