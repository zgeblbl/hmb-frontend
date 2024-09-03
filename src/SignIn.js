import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoEn from './en.svg';
import logoTr from './tr.svg';
import './SignIn.css';

function SignIn() {
  const [formData, setFormData] = useState({userName: '',password: ''});
  const [language, setLanguage] = useState('en');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      userName: 'exampleUser',
      password: 'examplePassword'
    };
    try {
      const response = await fetch('http://localhost:9090/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: formData //JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Sign-in successful:', result);
        // Redirect to home page upon successful sign-in
        navigate('/home');
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText);
        console.error('Sign-in failed:', errorText);
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setErrorMessage('An error occurred during sign-in.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');  // Navigate to the Forgot Password page
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const logo = language === 'en' ? logoEn : logoTr;

  return (
    <div className="SignIn">
      <header className="App-header">
        <div className="panel">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="signup-form-container">
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="input-group">
                <label htmlFor="email">{language === 'en' ? 'E-mail' : 'E-posta'}</label>
                <input 
                  type="email" 
                  id="userName" 
                  name="userName" 
                  value={formData.userName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">{language === 'en' ? 'Password' : 'Şifre'}</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <div className="forgot-password-wrapper">
                <span className="forgot-password" onClick={handleForgotPassword}>
                  {language === 'en' ? 'Forgot Password' : 'Şifremi Unuttum'}
                </span>
              </div>
              <button type="submit">{language === 'en' ? 'Sign In' : 'Giriş Yap'}</button>
            </form>
          </div>
        </div>
        <div className="language-buttons">
          <button onClick={() => handleLanguageChange('en')}>English</button>
          <button onClick={() => handleLanguageChange('tr')}>Türkçe</button>
        </div>
      </header>
    </div>
  );
}

export default SignIn;
