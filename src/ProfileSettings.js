import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import logo from './media/logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ProfileSettings() {
    const navigate = useNavigate();

    const [language, setLanguage] = useState('en'); // Default language
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [userId, setUserId] = useState(null);  // userId ve setUserId tanımlıyoruz
    const [titleId, setTitleId] = useState(null);  // titleId için state tanımlıyoruz

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleProfileMenuOpen = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };

    useEffect(() => {
        // localStorage'dan kullanıcı ID'sini alıyoruz
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }

        // titleId'yi localStorage'dan alıyoruz
        const storedTitleId = localStorage.getItem('titleId');
        if (storedTitleId) {
            setTitleId(parseInt(storedTitleId, 10));  // titleId'yi integer olarak kaydediyoruz
        }
    
        // Diğer işlemler
        const storedUserName = localStorage.getItem('userName') || 'John Doe';
        setUserName(storedUserName);
        const userInitials = storedUserName.split(' ').map(name => name[0]).join('');
        setInitials(userInitials);
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        console.log('Logged out');
        navigate('/');
    };
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      }, []);

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert(language === 'en' ? 'Passwords do not match' : 'Şifreler uyuşmuyor');
            return;
        }
        if (currentPassword === newPassword) {
            alert(language === 'en' ? 'Enter a password that is different from your current one' : 'Mevcut şifrenizden farklı bir şifre giriniz');
            return;
        }

        try {
            const response = await fetch(`http://localhost:9090/api/hmb/users/changePassword/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: newPassword
                }),
            });

            if (response.ok) {
                alert(language === 'en' ? 'Password changed successfully' : 'Şifre başarıyla değiştirildi');
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error during password change:', error);
            alert(language === 'en' ? 'An error occurred' : 'Bir hata oluştu');
        }
    };

    return (
        <div className="profile-settings">
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="Ministry Logo" />
                    <h1>
                        <span>{language === 'en' ? 'Ministry of Treasury' : 'Hazine ve Maliye'}</span>
                        <span>{language === 'en' ? 'and Finance' : 'Bakanlığı'}</span>
                    </h1>
                </div>
                <ul className="navbar-links">
                    <li onClick={() => navigate('/home')}>{language === 'en' ? 'Dashboard' : 'Anasayfa'}</li>
                    <li onMouseEnter={handleMenuOpen} onClick={handleMenuOpen}>
                        {language === 'en' ? 'Services' : 'Hizmetler'}
                    </li>
                    <li onClick={() => navigate('/contact')}>{language === 'en' ? 'Contact' : 'İletişim'}</li>
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
                        <MenuItem onClick={() => navigate('/leaveapplication')}>
                            {language === 'en' ? 'Leave Application' : 'İzin Başvurusu'}
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/userquery')}>
                            {language === 'en' ? 'User Query' : 'Kullanıcı Sorgulama'}
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/leave-request-management')}>
                            {language === 'en' ? 'Leave Request Management' : 'İzin Başvuru Yönetimi'}
                        </MenuItem>
                    </>
                )}

                {/* titleId 4, 5, 6 için sadece Leave Application seçeneğini gösteriyoruz */}
                {[4, 5, 6].includes(titleId) && (
                    <MenuItem onClick={() => navigate('/leaveapplication')}>
                        {language === 'en' ? 'Leave Application' : 'İzin Başvurusu'}
                    </MenuItem>
                )}
            </Menu>

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
                <MenuItem onClick={() => navigate('/leave-request-view')}>
                {language === 'en' ? 'Leave Requests' : 'İzin Başvurularım'}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                {language === 'en' ? 'Logout' : 'Çıkış Yap'}
                </MenuItem>
            </Menu>
            <main className="content">
                <Box className="password-change-panel" 
                    sx={{ 
                        padding: '20px', 
                        backgroundColor: '#f5f5f5', 
                        borderRadius: '8px', 
                        width: '40%', 
                        margin: '20px auto', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center'
                    }}
                >
                    <Typography 
                        variant="h5" 
                        gutterBottom 
                        sx={{ textAlign: 'center' }}  
                    >
                        {language === 'en' ? 'Change Password' : 'Şifre Değiştir'}
                    </Typography>
                    <div className="form-field" style={{ width: '100%' }}>
                    <TextField
                        label={language === 'en' ? 'Current Password' : 'Mevcut Şifre'}
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                       
                    />
                    </div>
                    <div className="form-field" style={{ width: '100%' }}>
                        <TextField
                            label={language === 'en' ? 'New Password' : 'Yeni Şifre'}
                            type="password"
                            fullWidth
                            margin="normal"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-field" style={{ width: '100%' }}>
                        <TextField
                            label={language === 'en' ? 'Confirm New Password' : 'Yeni Şifreyi Onayla'}
                            type="password"
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ 
                            marginTop: '10px', 
                            padding: '10px', 
                            alignSelf: 'center',
                            maxWidth: '200px'
                        }}
                        onClick={handleChangePassword}
                    >
                        {language === 'en' ? 'Change Password' : 'Şifreyi Değiştir'}
                    </Button>
                </Box>
            </main>
            <footer className="footer">
                <p>
                    {language === 'en' ? '© 2024 Ministry of Treasury and Finance. All rights reserved.' : '© 2024 Hazine ve Maliye Bakanlığı. Tüm hakları saklıdır.'}
                </p>
            </footer>
        </div>
    );
}
