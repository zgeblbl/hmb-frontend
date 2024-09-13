import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LeaveRequestManagement.css';
import logo from './logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';

const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return 'Invalid date';
    }

    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.round(differenceInDays);
};

export default function LeaveRequestManagement() {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [language, setLanguage] = useState('en'); // Default language
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');
    const [titleId, setTitleId] = useState(null);
    const [departmentId, setDepartmentId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [error, setError] = useState(null);
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
            const departmentId = localStorage.getItem('departmentId');
            try {
                const response = await fetch(`http://localhost:9090/api/hmb/permissions/getDepartmentPermissions/${departmentId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Assuming your API returns an array of leave requests
                setLeaveRequests(data);
            } catch (error) {
                console.error('Error fetching leave requests:', error);
                setError('Failed to fetch leave requests.');
            }
        };
    
        fetchLeaveRequests();
    }, []);
    
    const approveLeaveRequest = async (requestId) => {
        try {
            const response = await fetch(`http://localhost:9090/api/hmb/permissions/approvePermission/${requestId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Failed to approve leave request');
            }
            setLeaveRequests(prevRequests =>
                prevRequests.map(req =>
                    req.id === requestId ? { ...req, is_permission_approved: true } : req
                )
            );
        } catch (error) {
            console.error('Error approving leave request:', error);
        }
    };
    
    const declineLeaveRequest = async (requestId) => {
        try {
            const response = await fetch(`http://localhost:9090/api/hmb/permissions/declinePermission/${requestId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Failed to decline leave request');
            }
            setLeaveRequests(prevRequests =>
                prevRequests.map(req =>
                    req.id === requestId ? { ...req, is_permission_approved: false } : req
                )
            );
        } catch (error) {
            console.error('Error declining leave request:', error);
        }
    };
    const handleRequestClick = (requestId) => {
        handleExpandRequest(requestId);
    };
    const handleExpandRequest = (requestId) => {
        setExpandedRequestId(prevId => (prevId === requestId ? null : requestId));
    };


    return (
        <div className="leave-request-management">
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
            >
                {titleId === 1 || titleId === 2 || titleId === 3 ? (
                    <div>
                        <MenuItem onClick={() => navigate('/leaveapplication')}>
                            {language === 'en' ? 'Leave Application' : 'İzin Başvurusu'}
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/userquery')}>
                            {language === 'en' ? 'User Query' : 'Kullanıcı Sorgulama'}
                        </MenuItem>
                        <MenuItem onClick={() => handleSubPageNavigation('/leave-request-management')}>
                            {language === 'en' ? 'Leave Request Management' : 'İzin Başvuru Yönetimi'}
                        </MenuItem>
                    </div>
                ) : null}
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
            <h2 className="page-title">{language === 'en' ? 'Leave Request Management' : 'İzin Başvuru Yönetimi'}</h2>
            <div className="leave-requests">
                {leaveRequests.length === 0 ? (
                    <p>{language === 'en' ? 'No leave requests found for your department.' : 'Bölümünüz için izin başvurusu bulunamadı.'}</p>
                ) : (
                    leaveRequests.map(request => (
                        <div key={request.userPermissionId} className="leave-request-tab">
                            <div 
                                className="tab-header" 
                                onClick={() => handleExpandRequest(request.userPermissionId)}
                            >
                                {request.user.firstName} {request.user.lastName}
                            </div>
                            <Collapse in={expandedRequestId === request.userPermissionId}>
                                <div className="tab-content">
                                    <div className="date-duration-container">
                                        <div className="date-section">
                                            <p><strong>{language === 'en' ? 'Start Date:' : 'Başlangıç Tarihi:'} </strong>{request.startDate}</p>
                                            <p><strong>{language === 'en' ? 'End Date:' : 'Bitiş Tarihi:'} </strong>{request.endDate}</p>
                                        </div>
                                        <div className="date-section">
                                            <p><strong>{language === 'en' ? 'Duration:' : 'Süre:'} </strong>{calculateDuration(request.startDate, request.endDate)} {language === 'en' ? 'days' : 'gün'}</p>
                                            <p><strong>{language === 'en' ? 'Leave Type:' : 'İzin Türü:'} </strong>{request.permissionType}</p>
                                        </div>
                                    </div>
                                    <div className="tab-actions">
                                        <Button variant="contained" color="success" onClick={() => approveLeaveRequest(request.userPermissionId)}>
                                            {language === 'en' ? 'Approve' : 'Onayla'}
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => declineLeaveRequest(request.userPermissionId)}>
                                            {language === 'en' ? 'Decline' : 'Reddet'}
                                        </Button>
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                    ))
                )}
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