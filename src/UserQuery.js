import React, { useState, useEffect } from 'react';
import './UserQuery.css'; // Bu CSS dosyasına yukarıdaki stilleri ekleyin
import './HomePage';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import logo from './logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function UserQuery() {
    const navigate = useNavigate();
    const location = useLocation();

    const [language, setLanguage] = useState('en'); // Default language
    
    // Kullanıcı adı ve baş harflerini tutmak için state oluşturuyoruz
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [tckn, setTckn] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [results, setResults] = useState(null); // Sonuçları saklamak için state'i başta null olarak ayarladık

    // UserName menüsü için state
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);

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

    useEffect(() => {
        // localStorage'dan kullanıcı adını alıyoruz
        const storedUserName = localStorage.getItem('userName') || 'John Doe';
        setUserName(storedUserName);

        // Baş harfleri ayarlıyoruz
        const userInitials = storedUserName.split(' ').map(name => name[0]).join('');
        setInitials(userInitials);
    }, []);

    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            navigate(path, { replace: true });
        } else {
            handleMenuClose();
        }
    };

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

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

    const handleQuery = async () => {
        const queryData = {
            TCKN: tckn || "",  
            firstName: firstName || "",
            lastName: lastName || ""
        };
    
        try {
            const response = await fetch('http://localhost:9090/api/hmb/users/search', {  // backend portu doğru olmalı
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(queryData),
            });
    
            if (response.ok) {
                const data = await response.json();
                setResults(data.length > 0 ? data : []); // Sonuçları güncelleme
            } else if (response.status === 404) {
                setResults([]); // No results found
            } else {
                console.error('Search failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
    };
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },  // Eğer backend id dönüyorsa
        { field: 'firstName', headerName: 'İsim', width: 150 },
        { field: 'lastName', headerName: 'Soyisim', width: 150 },
        { field: 'TCKN', headerName: 'TCKN', width: 200 }
    ];

    // Gelen veriyi tablo için hazırlıyoruz
    const rows = results ? results.map((user, index) => ({
        id: index + 1, // Her kullanıcıya unique bir ID veriyoruz, backend'den gelen id varsa kullan
        firstName: user.firstName,
        lastName: user.lastName,
        TCKN: user.TCKN
    })) : [];

    return (
        <div className="user-query">
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
                <Box className="query-panel" sx={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', width: '100%', maxWidth: '400px', marginTop: '20px' }}>
                    <TextField
                        label="TCKN"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={tckn}
                        onChange={(e) => setTckn(e.target.value)}
                    />
                    <TextField
                        label="İsim"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        label="Soyisim"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: '20px' }}
                        onClick={handleQuery}
                    >
                        Sorgula
                    </Button>
                    {results !== null && (
                        <Box sx={{ height: 400, width: '100%', marginTop: '20px' }}>
                            {results.length > 0 ? (
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                            ) : (
                                <Typography>No results found</Typography>
                            )}
                        </Box>
                    )}
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
