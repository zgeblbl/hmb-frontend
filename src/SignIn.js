import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoEn from './media/en.svg';
import logoTr from './media/tr.svg';
import './SignIn.css';

function SignIn() {
  const [formData, setFormData] = useState({email: '',password: ''});
  const [language, setLanguage] = useState('en');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9090/api/hmb/users/signin', { // Doğru endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // userName ve password gönderiliyor
      });

      if (response.ok) {
        const result = await response.json();  // JSON formatında veri alıyoruz
        
        const { firstName, lastName, userId, titleId, departmentId, email} = result;
        console.log('API Response:', result);
        localStorage.setItem('userName', `${firstName} ${lastName}`);
        localStorage.setItem('userId', userId);
        localStorage.setItem('titleId', titleId);  // title_id'yi kaydediyoruz
        localStorage.setItem('departmentId', departmentId);
        localStorage.setItem('email', email);

        console.log('Stored departmentId  in signin:', departmentId);
        
       // Admin title_id'lerini kontrol et
      if (titleId ===7) {
        navigate('/admin-home');  // Admin için farklı bir sayfaya yönlendir
      } else {
        navigate('/home');  // Normal kullanıcı için yönlendirme
      }
        
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
    localStorage.setItem('language', lang); // Store the selected language
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
                  id="email" 
                  name="email" 
                  value={formData.email} 
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