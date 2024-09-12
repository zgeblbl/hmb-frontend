import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Contact.css';
import logo from './logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Contact() {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [language, setLanguage] = useState('en'); // Default language
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');
    const [titleId, setTitleId] = useState(null); // titleId için state tanımlıyoruz

    // UserName menüsü için state
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSubPageNavigation = (path) => {
        handleMenuClose();
        if (location.pathname !== path) {
            navigate(path, { replace: true });
        }
    };

    // Profil menüsünü açma/kapama
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

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:9090/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,            // İsim alanı
                    email: email,          // E-posta alanı
                    messageContent: message  // Mesaj alanı: Backend'de "messageContent" ile eşleşmeli
                }),
            });

            if (response.ok) {
                alert(language === 'en' ? 'Message sent successfully!' : 'Mesaj başarıyla gönderildi!');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                alert(language === 'en' ? 'Failed to send message.' : 'Mesaj gönderme başarısız oldu.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert(language === 'en' ? 'An error occurred while sending the message.' : 'Mesaj gönderilirken bir hata oluştu.');
        }
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      }, []);

    useEffect(() => {
        // localStorage'dan kullanıcı adı ve titleId'yi alıyoruz
        const storedUserName = localStorage.getItem('userName') || 'John Doe';
        const userInitials = storedUserName.split(' ').map(name => name[0]).join('');
        setUserName(storedUserName);
        setInitials(userInitials);

        const storedTitleId = localStorage.getItem('titleId');
        if (storedTitleId) {
            setTitleId(parseInt(storedTitleId, 10)); // titleId'yi integer olarak ayarlıyoruz
        }
    }, []);

    return (
        <div className="contact-us">
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="Ministry Logo" />
                    <h1>
                        <span>{language === 'en' ? 'Ministry of Treasury' : 'Hazine ve Maliye'}</span>
                        <span>{language === 'en' ? 'and Finance' : 'Bakanlığı'}</span>
                    </h1>
                </div>
                <ul className="navbar-links">
                    <li onClick={() => handleSubPageNavigation('/home')}>{language === 'en' ? 'Dashboard' : 'Anasayfa'}</li>
                    <li onMouseEnter={handleMenuOpen} onClick={handleMenuOpen}>
                        {language === 'en' ? 'Services' : 'Hizmetler'}
                    </li>
                    <li onClick={() => handleSubPageNavigation('/contact')}>{language === 'en' ? 'Contact' : 'İletişim'}</li>
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

            {/* Services menüsü */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                    onMouseLeave: handleMenuClose,
                }}
            >
                {/* titleId 1, 2, 3 için Leave Application, User Query ve İzin Başvuruları seçeneklerini gösteriyoruz */}
                {[1, 2, 3].includes(titleId) && (
                    <>
                        <MenuItem onClick={() => handleSubPageNavigation('/leaveapplication')}>
                            {language === 'en' ? 'Leave Application' : 'İzin Başvurusu'}
                        </MenuItem>
                        <MenuItem onClick={() => handleSubPageNavigation('/userquery')}>
                            {language === 'en' ? 'User Query' : 'Kullanıcı Sorgulama'}
                        </MenuItem>
                        <MenuItem onClick={() => handleSubPageNavigation('/leave-approvals')}>
                            {language === 'en' ? 'Leave Approvals' : 'İzin Başvuruları'}
                        </MenuItem>
                    </>
                )}

                {/* titleId 4, 5, 6 için sadece Leave Application seçeneğini gösteriyoruz */}
                {[4, 5, 6].includes(titleId) && (
                    <MenuItem onClick={() => handleSubPageNavigation('/leaveapplication')}>
                        {language === 'en' ? 'Leave Application' : 'İzin Başvurusu'}
                    </MenuItem>
                )}
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
                <MenuItem onClick={() => navigate('/profile-settings')}>
                {language === 'en' ? 'Profile Settings' : 'Profil Ayarları'}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                {language === 'en' ? 'Logout' : 'Çıkış Yap'}
                </MenuItem>
            </Menu>

            <main className="content">
                <div className="contact-form-panel">
                    <h2>{language === 'en' ? 'Contact Us' : 'Bize Ulaşın'}</h2>
                    <TextField
                        label={language === 'en' ? 'Your Name' : 'Adınız'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label={language === 'en' ? 'Your Email' : 'E-posta Adresiniz'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label={language === 'en' ? 'Message' : 'Mesajınız'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: '20px' }}
                        onClick={handleSubmit}
                    >
                        {language === 'en' ? 'SUBMIT' : 'GÖNDER'}
                    </Button>
                </div>
            </main>
            <footer className="footer">
                <p>
                    {language === 'en' ? '© 2024 Ministry of Treasury and Finance. All rights reserved.' : '© 2024 Hazine ve Maliye Bakanlığı. Tüm hakları saklıdır.'}
                </p>
            </footer>
        </div>
    );
}
