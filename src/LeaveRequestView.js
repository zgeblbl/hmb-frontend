import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LeaveRequestView.css';
import logo from './logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function LeaveRequestView(){
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [language, setLanguage] = useState('en'); // Default language
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');
    const [userId, setUserId] = useState(null);
    const [titleId, setTitleId] = useState(null);
    // UserName menüsü için state
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [expandedRequestId, setExpandedRequestId] = useState(null);

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

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await fetch(`http://localhost:9090/api/hmb/permissions/getUserPermissions/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Assuming your API returns an array of leave requests
                setLeaveRequests(data);
            } catch (error) {
                console.error('Error fetching leave requests:', error);
            }
        };
        fetchLeaveRequests();

    }, []);
    

    const handleRequestToggle = (requestId) => {
        setExpandedRequestId(expandedRequestId === requestId ? null : requestId);
    };


    return (
        <div className="leave-request-view">
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
                <MenuItem onClick={() => navigate('/leave-request-view')}>
                {language === 'en' ? 'Leave Requests' : 'İzin Başvurularım'}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                {language === 'en' ? 'Logout' : 'Çıkış Yap'}
                </MenuItem>
            </Menu>
            <main className="content">
            <h2 className="page-title">{language === 'en' ? 'Leave Requests' : 'İzin Başvurularım'}</h2>
                <div className="leave-requests-container">
                    {leaveRequests.map(request => (
                        <Box
                            key={request.userPermissionId}
                            className="leave-request-box"
                            onClick={() => handleRequestToggle(request.userPermissionId)}
                            style={{ padding: '20px', marginBottom: '15px', fontSize: '18px' }}
                        >
                            <div className="leave-request-summary">
                                <span style={{fontWeight: 'bold'}}>{language === 'en' ? request.permissionType : translatePermissionType(request.permissionType)}</span>
                                {/* Spacer for more separation */}
                                <span style={{ margin: '0 15px' }}>  </span>

                                {/* Approval status with conditional styling */}
                                <span 
                                    style={{ 
                                        color: request.permissionApproval === 'APPROVED' ? 'green' : 
                                            request.permissionApproval === 'DECLINED' ? 'red' : 'black',
                                            fontWeight: 'bold'
                                    }}
                                >
                                    {language === 'en' ? request.permissionApproval : translatePermissionApproval(request.permissionApproval)}
                                </span>
                                {expandedRequestId === request.userPermissionId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </div>
                            {expandedRequestId === request.userPermissionId && (
                                <div className="leave-request-details">
                                    <p><strong>{language === 'en' ? 'Start Date:' : 'Başlangıç Tarihi:'}</strong> {request.startDate}</p>
                                    <p><strong>{language === 'en' ? 'End Date:' : 'Bitiş Tarihi:'}</strong> {request.endDate}</p>
                                    <p><strong>{language === 'en' ? 'Approval Date:' : 'Onay Tarihi:'}</strong> {request.approvalDate ? request.approvalDate : (language === 'en' ? 'Not Available' : 'Mevcut Değil')}</p>
                                </div>
                            )}
                        </Box>
                    ))}
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

function translatePermissionType(permissionType) {
    switch (permissionType) {
        case 'ANNUAL':
            return 'Yıllık İzin';
        case 'SICK':
            return 'Hastalık İzni';
        case 'MATERNITY':
            return 'Doğum İzni';
        case 'EXCUSE_LEAVE':
            return 'Mazeret İzni';
        default:
            return permissionType;
    }
}
function translatePermissionApproval(permissionApproval) {
    switch (permissionApproval) {
        case 'APPROVED':
            return 'ONAYLANDI';
        case 'PENDING':
            return 'BEKLEMEDE';
        case 'DECLINED':
            return 'REDDEDİLDİ';
        default:
            return permissionApproval;
    }
}
