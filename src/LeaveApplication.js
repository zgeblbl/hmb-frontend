import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LeaveApplication.css';
import logo from './logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function LeaveApplication() {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [leaveDays, setLeaveDays] = useState('');
    const [reason, setReason] = useState('');
    const [language, setLanguage] = useState('en'); // Default language
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');

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

    const handleSubmit = () => {
        // Handle leave application submission
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

    useEffect(() => {
        // Example of setting initial values from localStorage or other sources
        const storedUserName = localStorage.getItem('userName') || 'John Doe';
        const userInitials = storedUserName.split(' ').map(name => name[0]).join('');
        setUserName(storedUserName);
        setInitials(userInitials);
    }, []);

    return (
        <div className="leave-application">
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="Ministry Logo" />
                    <h1>
                        <span>{language === 'en' ? 'Ministry of Treasury' : 'Hazine Bakanlığı'}</span>
                        <span>{language === 'en' ? 'and Finance' : 've Maliye'}</span>
                    </h1>
                </div>
                <ul className="navbar-links">
                    <li onClick={() => handleSubPageNavigation('/home')}>{language === 'en' ? 'Dashboard' : 'Gösterge Paneli'}</li>
                    <li onMouseEnter={handleMenuOpen} onClick={handleMenuOpen}>
                        {language === 'en' ? 'Services' : 'Hizmetler'}
                    </li>
                    <li onClick={() => handleSubPageNavigation('/contact')}>{language === 'en' ? 'Contact' : 'İletişim'}</li>
                </ul>
                <div className="navbar-profile">
                    <div className="profile-initials">{initials}</div>
                    <span>{userName}</span>
                </div>
            </nav>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                    onMouseLeave: handleMenuClose,
                }}
            >
                <MenuItem onClick={() => handleSubPageNavigation('/leaveapplication')}>
                    {language === 'en' ? 'Leave Application' : 'İzin Başvurusu'}
                </MenuItem>
                <MenuItem onClick={() => handleSubPageNavigation('/userquery')}>
                    {language === 'en' ? 'User Query' : 'Kullanıcı Sorgulama'}
                </MenuItem>
            </Menu>
            <main className="content">
                <Box className="application-panel">
                    <TextField
                        label={language === 'en' ? 'Number of Leave Days' : 'İzin Gün Sayısı'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={leaveDays}
                        onChange={(e) => setLeaveDays(e.target.value)}
                    />
                    <TextField
                        label={language === 'en' ? 'Reason for Leave' : 'İzin Nedeni'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: '20px' }}
                        onClick={handleSubmit}
                    >
                        {language === 'en' ? 'SUBMIT APPLICATION' : 'Başvuruyu Gönder'}
                    </Button>
                </Box>
            </main>
            <footer className="footer">
                <p>
                    {language === 'en' ? '© 2024 Ministry of Treasury and Finance. All rights reserved.' : '© 2024 Hazine ve Maliye Bakanlığı. Tüm hakları saklıdır.'}
                </p>
                <div className="language-buttons">
                    <button onClick={() => handleLanguageChange('en')}>English</button>
                    <button onClick={() => handleLanguageChange('tr')}>Türkçe</button>
                </div>
            </footer>
        </div>
    );
}