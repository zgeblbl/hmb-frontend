import React, { useState, useEffect } from 'react';
import './UserQuery.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import logo from './media/logo.svg';
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
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [tckn, setTckn] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [results, setResults] = useState(null); // Sonuçları saklamak için state'i başta null olarak ayarladık
    const [titleId, setTitleId] = useState(null); // titleId için state tanımlıyoruz

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

        // titleId'yi localStorage'dan alıyoruz
        const storedTitleId = localStorage.getItem('titleId');
        if (storedTitleId) {
            setTitleId(parseInt(storedTitleId, 10)); // titleId'yi integer olarak ayarlıyoruz
        }
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

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      }, []);

    const handleQuery = async () => {
        if (!tckn && !firstName && !lastName) {
            if (language === 'en') {
                alert('Please fill in at least one field.');
            } else {
                alert('Lütfen en az bir alanı doldurun.');
            }
            return;
        }

        const queryData = {
            TCKN: tckn || "",  
            firstName: firstName || "",
            lastName: lastName || "",
            usertitleId: localStorage.getItem('titleId'),
            userdepartmentId: localStorage.getItem('departmentId')
        };
    
        try {
            const response = await fetch('http://localhost:9090/api/hmb/users/search', {
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
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'İsim', width: 150 },
        { field: 'lastName', headerName: 'Soyisim', width: 150 },
        { field: 'TCKN', headerName: 'TCKN', width: 200 }
    ];

    const rows = results ? results.map((user, index) => ({
        id: index + 1,
        firstName: user.firstName,
        lastName: user.lastName,
        TCKN: user.tckn
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
                    <li onClick={() => handleSubPageNavigation('/admin-home')}>{language === 'en' ? 'Dashboard' : 'Anasayfa'}</li>
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
                        <MenuItem onClick={() => handleSubPageNavigation('/leave-request-management')}>
                            {language === 'en' ? 'Leave Request Management' : 'İzin Başvuru Yönetimi'}
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
                <MenuItem onClick={() => navigate('/leave-request-view')}>
                {language === 'en' ? 'Leave Requests' : 'İzin Başvurularım'}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                {language === 'en' ? 'Logout' : 'Çıkış Yap'}
                </MenuItem>
            </Menu>

            <main className="content">
                <Box className="query-panel" sx={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', width: '100%', marginTop: '20px' }}>
                    <div className="form-field">
                        <TextField
                            label="TCKN"
                            fullWidth
                            margin="normal"
                            value={tckn}
                            onChange={(e) => setTckn(e.target.value)}
                        />
                    </div>
                    <div className="form-field">
                        <TextField
                            label={language === 'en' ? 'First Name' : 'İsim'}
                            fullWidth
                            margin="normal"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form-field">
                        <TextField
                            label={language === 'en' ? 'Last Name' : 'Soyisim'}
                            fullWidth
                            margin="normal"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: '10px', padding: '6px' }}
                            onClick={handleQuery}
                        >
                            {language === 'en' ? 'Search' : 'Sorgula'}
                        </Button>
                        {results !== null && (
                            <Box sx={{ height: 350, width: '50%', marginTop: '10px', backgroundColor: '#ffffff', borderRadius: '8px', }}>
                                {results.length > 0 ? (
                                   <DataGrid
                                   rows={rows}
                                   columns={columns}
                                   pageSize={5}
                                   pagination={false}
                                   rowsPerPageOptions={[]}
                               />
                                ) : (
                                    <Typography>{language === 'en' ? 'No results found' : 'Sonuç bulunamadı'}</Typography>
                                )}
                            </Box>
                        )}
            </main>

            <footer className="footer">
                <p>
                    {language === 'en' ? '© 2024 Ministry of Treasury and Finance. All rights reserved.' : '© 2024 Hazine ve Maliye Bakanlığı. Tüm hakları saklıdır.'}
                </p>
            </footer>
        </div>
    );
}
