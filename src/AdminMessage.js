import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import logo from './logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function AdminMessage() {
    const [messages, setMessages] = useState([]); // Mesajları tutacak state
    const [loading, setLoading] = useState(true); // Yüklenme durumu
    const [error, setError] = useState(null); // Hata durumu
    const navigate = useNavigate(); // AdminHome'daki navigasyon için ekleme
    
    // Services menüsü ve profil menüsü için state
    const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');
    const [language, setLanguage] = useState('en');
  
    // Navbar işlevleri
    const handleServicesMenuOpen = (event) => {
      setServicesAnchorEl(event.currentTarget);
    };
  
    const handleServicesMenuClose = () => {
      setServicesAnchorEl(null);
    };
  
    const handleProfileMenuOpen = (event) => {
      setProfileAnchorEl(event.currentTarget);
    };
  
    const handleProfileMenuClose = () => {
      setProfileAnchorEl(null);
    };
  
    const handleLogout = () => {
      console.log('Logged out');
      navigate('/');
    };
  
    // userName ve initials ayarlama
    useEffect(() => {
      const storedUserName = localStorage.getItem('userName') || 'John Doe';
      setUserName(storedUserName);
      const userInitials = storedUserName.split(' ').map(name => name[0]).join('');
      setInitials(userInitials);
    }, []);
    useEffect(() => {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    }, []);
  
    // Mesajları backend'den alma
    useEffect(() => {
        const fetchMessages = async () => {
          try {
            const response = await fetch('http://localhost:9090/api/messages/getMessages'); // Backend'deki mesajları alma API'si
            if (!response.ok) {
              throw new Error('Mesajlar alınamadı');
            }
            const data = await response.json();
            setMessages(data); // Mesajları state'e kaydet
            setLoading(false); // Yüklenme bitti
          } catch (error) {
            setError(error.message); // Hata mesajını kaydet
            setLoading(false); // Hata durumunda da loading false olmalı
          }
        };
    
        fetchMessages(); // Fonksiyonu çağır
      }, []); // Boş dependency array, sadece component mount edildiğinde çalışır

      // Mesajları en yeni tarihten en eskiye doğru sıralama
    const sortedMessages = messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    
      // Eğer hala yükleniyorsa
      if (loading) {
        return <div>Yükleniyor...</div>;
      }
    
      // Eğer hata varsa
      if (error) {
        return <div>Hata: {error}</div>;
      }
  
    return (
      <div className="homepage">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src={logo} alt="Ministry Logo" />
            <h1>
              <span>{language === 'en' ? 'Ministry of Treasury' : 'Hazine ve Maliye'}</span>
              <span>{language === 'en' ? 'and Finance' : 'Bakanlığı'}</span>
            </h1>
          </div>
          <ul className="navbar-links">
            <li onClick={() => navigate('/admin-home')}>{language === 'en' ? 'Dashboard' : 'Anasayfa'}</li>
            <li onMouseEnter={handleServicesMenuOpen} onClick={handleServicesMenuOpen}>
              {language === 'en' ? 'Services' : 'Hizmetler'}
            </li>
            <li onClick={() => navigate('/admin-message')}>{language === 'en' ? 'Messages' : 'Mesajlar'}</li>
          </ul>
          <div className="navbar-profile">
            <div className="profile-initials">{initials}</div>
            <li
              onMouseEnter={handleProfileMenuOpen}
              onClick={handleProfileMenuOpen}
              style={{ cursor: 'pointer', listStyleType: 'none' }}
            >
              {userName}
            </li>
          </div>
        </nav>
  
        {/* Services menu */}
        <Menu
          anchorEl={servicesAnchorEl}
          open={Boolean(servicesAnchorEl)}
          onClose={handleServicesMenuClose}
          MenuListProps={{
            onMouseLeave: handleServicesMenuClose,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
            <MenuItem onClick={() => navigate('/add-user')}>
                {language === 'en' ? 'Add User' : 'Kullanıcı Ekle'}
            </MenuItem>
            <MenuItem onClick={() => navigate('/admin-query')}>
                {language === 'en' ? 'User Query' : 'Kullanıcı Sorgulama'}
            </MenuItem>
        </Menu>
  
        {/* Profile menu */}
        <Menu
          anchorEl={profileAnchorEl}
          open={Boolean(profileAnchorEl)}
          onClose={handleProfileMenuClose}
          MenuListProps={{
            onMouseLeave: handleProfileMenuClose,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => navigate('/admin-settings')}>
            {language === 'en' ? 'Profile Settings' : 'Profil Ayarları'}
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            {language === 'en' ? 'Logout' : 'Çıkış Yap'}
          </MenuItem>
        </Menu>
  
        {/* Mesajların gösterimi */}
        <div style={styles.container}>
          <div style={styles.panel}>
            {sortedMessages.length === 0 ? (
              <p>Henüz paylaşılmış bir mesaj yok.</p>
            ) : (
              sortedMessages.map((message) => (
                <div key={message.id} style={styles.messageBox}>
                <p><strong>İsim:</strong> {message.name}</p>
                <p><strong>Email:</strong> {message.email}</p>
                <p><strong>Mesaj:</strong> {message.messageContent}</p> {/* Mesaj içeriğini doğru gösteriyoruz */}
                <p><strong>Tarih:</strong> {new Date(message.createdAt).toLocaleString()}</p> {/* Tarih formatı */}
            </div>
              ))
            )}
          </div>
        </div>
        <footer className="footer">
            <p>
              © 2024 {language === 'en' ? 'Ministry of Treasury and Finance All rights reserved.' : 'Hazine ve Maliye Bakanlığı Tüm hakları saklıdır.'}
            </p>
        </footer>
      </div>
    );
  }
  const styles = {
    container: {
      padding: '20px',
      display: 'flex',
      justifyContent: 'center', // Container içeriğini ortalayacak
    },
    panel: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '60%', // Panelin genişliğini %60 olarak ayarladık
      maxWidth: '800px', // Maksimum genişlik ayarı (örneğin 800px)
      minWidth: '300px', // Minimum genişlik ayarı
    },
    messageBox: {
      marginBottom: '20px',
      padding: '15px',
      borderBottom: '1px solid #ccc',
    },
  };
  export default AdminMessage;
  