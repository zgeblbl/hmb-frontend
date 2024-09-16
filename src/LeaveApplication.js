import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LeaveApplication.css';
import logo from './logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function LeaveApplication() {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [leaveDays, setLeaveDays] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [leaveType, setLeaveType] = useState('');
    const [language, setLanguage] = useState('en'); // Default language
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState('');
    // UserName menüsü için state
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [titleId, setTitleId] = useState(null);  // titleId için state tanımlıyoruz


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

    const leaveTypes = [
        { value: 'ANNUAL', label: language === 'en' ? 'Annual Leave' : 'Yıllık İzin' },
        { value: 'SICK', label: language === 'en' ? 'Sick Leave' : 'Hastalık İzni' },
        { value: 'MATERNITY', label: language === 'en' ? 'Maternity Leave' : 'Doğum İzni' },
        { value: 'EXCUSE_LEAVE', label: language === 'en' ? 'Excuse Leave' : 'Mazeret İzni' }
    ];

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

    const handleSubmit = async () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const durationInDays = ((end - start) / (1000 * 60 * 60 * 24))-1;

        // Validate the date range
        if (end <= start) {
            setErrorMessage(language === 'en' ? 'End date has to be after start date.' : 'Bitiş tarihi başlangıç tarihinden sonra olmalıdır.');
            return;
        } else if (parseInt(leaveDays) !== durationInDays + 1) { // Adding 1 because both start and end dates are inclusive
            setErrorMessage(language === 'en' ? 'Duration does not match the number of leave days.' : 'Süre izin gün sayısıyla uyuşmuyor.');
            return;
        } else {
            setErrorMessage(''); // Clear error message if dates are valid
        }
        const leaveData = {
            startDate,
            endDate,
            approvalDate: '',
            isPermissionDeleted: false,
            user: {
                userId: userId
            },
            permissionType: leaveType,
            permissionApproval: 'PENDING'
        };
    
        try {
            const response = await fetch('http://localhost:9090/api/hmb/permissions/addPermission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leaveData),
            });
    
            if (response.ok) {
                setSubmissionStatus(language === 'en' ? 'Application submitted successfully!' : 'Başvuru başarıyla gönderildi!');
            
                // Clear out all the fields
                setLeaveDays('');
                setStartDate('');
                setEndDate('');
                setLeaveType('');
            } else {
                setErrorMessage(language === 'en' ? 'Failed to submit application.' : 'Başvuru gönderilemedi.');
            }
        } catch (error) {
            console.error('Error submitting leave application:', error);
            setErrorMessage(language === 'en' ? 'Error occurred during submission.' : 'Başvuru sırasında hata oluştu.');
        }
    };

    return (
        <div className="leave-application">
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
                {/* titleId 1, 2, 3 için Leave Application, User Query ve İzin Başvuruları seçeneklerini gösteriyoruz */}
                {[1, 2, 3].includes(titleId) && (
                    <>
                        <MenuItem onClick={() => navigate('/leaveapplication')}>
                            {language === 'en' ? 'Leave Application' : 'İzin Başvurusu'}
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/userquery')}>
                            {language === 'en' ? 'User Query' : 'Kullanıcı Sorgulama'}
                        </MenuItem>
                        <MenuItem onClick={() => handleSubPageNavigation('/leave-request-management')}>
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
                        label={language === 'en' ? 'Start Date' : 'Başlangıç Tarihi'}
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <TextField
                        label={language === 'en' ? 'End Date' : 'Bitiş Tarihi'}
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>{language === 'en' ? 'Leave Type' : 'İzin Türü'}</InputLabel>
                        <Select
                            value={leaveType}
                            onChange={(e) => setLeaveType(e.target.value)}
                        >
                            {leaveTypes.map((type) => (
                                <MenuItem key={type.value} value={type.value}>
                                    {type.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: '20px' }}
                        onClick={handleSubmit}
                    >
                        {language === 'en' ? 'SUBMIT APPLICATION' : 'Başvuruyu Gönder'}
                    </Button>
                    {submissionStatus && (
                        <div className="submission-status">
                            {submissionStatus}
                        </div>
                    )}
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