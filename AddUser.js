import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddUser.css';
import logo from './logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function AddUser() {
    const navigate = useNavigate();
    const location = useLocation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [tckn, setTckn] = useState('');
    const [password, setPassword] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [titleId, setTitleId] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [language, setLanguage] = useState('en'); // Default to English
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');
    const [userId, setUserId] = useState(null);

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

    useEffect(() => {
        // Example of setting initial values from localStorage or other sources
        const storedUserName = localStorage.getItem('userName') || 'John Doe';
        const storedUserId = localStorage.getItem('userId');
        const userInitials = storedUserName.split(' ').map(name => name[0]).join('');
        setUserName(storedUserName);
        setInitials(userInitials);
        setUserId(storedUserId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deptId = parseInt(departmentId);
        const ttlId = parseInt(titleId);

        if (!firstName || !lastName || !email || !tckn || !password || isNaN(deptId) || isNaN(ttlId)) {
            setErrorMessage(language === 'en' ? 'All fields are required.' : 'Tüm alanlar gereklidir.');
            return;
        }

        const userData = {
            firstName,
            lastName,
            email,
            tckn,
            password,
            isUserDeleted: false,
            department: {
                departmentId: deptId
            },
            title: {
                titleId: ttlId
            }
        };

        try {
            const response = await fetch('http://localhost:9090/api/hmb/users/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                setSubmissionStatus(language === 'en' ? 'User added successfully!' : 'Kullanıcı başarıyla eklendi!');
                setFirstName('');
                setLastName('');
                setEmail('');
                setTckn('');
                setPassword('');
                setDepartmentId('');
                setTitleId('');
                setErrorMessage('');
            } else {
                setErrorMessage(language === 'en' ? 'Failed to add user.' : 'Kullanıcı eklenemedi.');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            setErrorMessage(language === 'en' ? 'An error occurred.' : 'Bir hata oluştu.');
        }
    };


    return (
        <div className="add-user">
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
            <form className="add-panel" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>{language === 'en' ? 'First Name' : 'Ad'}</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder={language === 'en' ? 'Enter First Name' : 'Ad Giriniz'}
                        />
                    </div>
                    <div className="form-field">
                        <label>{language === 'en' ? 'Last Name' : 'Soyad'}</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder={language === 'en' ? 'Enter Last Name' : 'Soyad Giriniz'}
                        />
                    </div>
                    <div className="form-field">
                        <label>{language === 'en' ? 'Email Address' : 'E-posta Adresi'}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={language === 'en' ? 'Enter Email' : 'E-posta Giriniz'}
                        />
                    </div>
                    <div className="form-field">
                        <label>{language === 'en' ? 'Password' : 'Şifre'}</label>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={language === 'en' ? 'Enter Password' : 'Şifre Giriniz'}
                        />
                    </div>
                    <div className="form-field">
                        <label>{language === 'en' ? 'TCKN' : 'TCKN'}</label>
                        <input
                            type="text"
                            value={tckn}
                            onChange={(e) => setTckn(e.target.value)}
                            placeholder={language === 'en' ? 'Enter TCKN' : 'TCKN Giriniz'}
                        />
                    </div>
                    <div className="form-field">
                        <label>{language === 'en' ? 'Department ID' : 'Departman ID'}</label>
                        <input
                            type="text"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                            placeholder={language === 'en' ? 'Enter Department ID' : 'Departman ID Giriniz'}
                        />
                    </div>
                    <div className="form-field">
                        <label>{language === 'en' ? 'Title ID' : 'Unvan ID'}</label>
                        <input
                            type="text"
                            value={titleId}
                            onChange={(e) => setTitleId(e.target.value)}
                            placeholder={language === 'en' ? 'Enter Title ID' : 'Unvan ID Giriniz'}
                        />
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {submissionStatus && <div className="submission-status">{submissionStatus}</div>}
                    <button type="submit" className="submit-btn">
                        {language === 'en' ? 'Add User' : 'Kullanıcı Ekle'}
                    </button>
                </form>
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