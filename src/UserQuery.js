import * as React from 'react';
import './UserQuery.css';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function UserQuery() {
    const navigate = useNavigate();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [tckn, setTckn] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

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

    const handleQuery = () => {
        // Burada sorgulama işleminizi gerçekleştirin.
        console.log('Sorgulanan TCKN:', tckn);
        console.log('Sorgulanan İsim:', firstName);
        console.log('Sorgulanan Soyisim:', lastName);
    };

    // Kullanıcının adı
    const userName = "John Doe";

    // Kullanıcının adının baş harfini al
    const initials = userName.split(' ').map(name => name[0]).join('');

    return (
        <div className="user-query">
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="Ministry Logo" />
                    <h1>
                        <span>Ministry of Treasury</span>
                        <span>and Finance</span>
                    </h1>
                </div>
                <ul className="navbar-links">
                    <li onClick={() => handleNavigation('/dashboard')}>Dashboard</li>
                    <li 
                        onMouseEnter={handleMenuOpen} 
                        onClick={handleMenuOpen}
                    >
                        Services
                    </li>
                    <li onClick={() => handleNavigation('/contact')}>Contact</li>
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
                <MenuItem onClick={() => handleSubPageNavigation('/leave-application')}>
                    İzin Başvurusu
                </MenuItem>
                <MenuItem onClick={() => handleSubPageNavigation('/user-query')}>
                    Kullanıcı Sorgulama
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
                </Box>
            </main>
        </div>
    );
}
