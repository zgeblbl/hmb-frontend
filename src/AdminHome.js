import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logo from './logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import zaferImage from './ZaferB.jpg';

export default function AdminHome() {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('en');
  
    // Services menüsü için state
    const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  
    // UserName menüsü için state
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  
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
  
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');
  
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
  
    // Images data
    const itemDataRow1 = [
        {
        img: zaferImage,
        title: 'ZaferB',
        },
        {
        img: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Hazine_M%C3%BCste%C5%9Farl%C4%B1%C4%9F%C4%B1.jpg',
        title: 'Ana Bina',
        },
        {
        img: 'https://www.gurbag.com/uploads/tamamlanan/mayem/mayem_giris_(large).jpg',
        title: 'Ek Bina 1',
        },
        {
        img: 'https://i.ekonomim.com/2/1280/720/storage/files/images/2024/07/30/mehmet-simsekten-kredi-degerlendirmesi-dunya-bankasinin-duydugu-guvenin-gostergesi-uneu_cover.jpg.webp',
        title: 'Bakan',
        },
        {
        img: 'https://www.gurbag.com/uploads/tamamlanan/mayem/mayem02_(large).jpg',
        title: 'Ek Bina 2',
        },
    ];

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
            <MenuItem onClick={() => navigate('/admin-query')}>
              {language === 'en' ? 'User Query' : 'Kullanıcı Sorgulama'}
            </MenuItem>
            <MenuItem onClick={() => navigate('/add-user')}>
              {language === 'en' ? 'Add User' : 'Kullanıcı Ekle'}
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
    
          <main className="content">
        <Box className="image-list-row">
          <ImageList
            sx={{
              display: 'flex',
              gap: '0px',
              padding: '0',
              margin: '0',
            }}
          >
            {itemDataRow1.map((item) => (
              <ImageListItem
                key={item.img}
                sx={{
                  flex: '1 0 0px',
                  margin: '0',
                  padding: '0',
                  height: 'auto',
                }}
              >
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    borderRadius: '8px',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    margin: '0',
                    padding: '0',
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </main>
    
          <footer className="footer">
            <p>
              © 2024 {language === 'en' ? 'Ministry of Treasury and Finance All rights reserved.' : 'Hazine ve Maliye Bakanlığı Tüm hakları saklıdır.'}
            </p>
          </footer>
        </div>
      );
    }