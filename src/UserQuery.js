import * as React from 'react';
import './UserQuery.css';
import './HomePage';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function UserQuery() {
    const navigate1 = useNavigate();
    const location1 = useLocation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [tckn, setTckn] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [results, setResults] = React.useState([]);

    const handleNavigation = (path) => {
        if (location1.pathname !== path) {
            navigate1(path, { replace: true });
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
        if (location1.pathname !== path) {
            navigate1(path, { replace: true });
        }
    };

    const handleQuery = async () => {
        try {
            const response = await fetch(`/api/hmb/users/search?tckn=${tckn}&name=${firstName}&surname=${lastName}`);
            if (response.ok) {
                const data = await response.json();
                setResults(data);
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
                <MenuItem onClick={() => handleSubPageNavigation('/userquery')}>
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
                    <Box sx={{ marginTop: '20px' }}>
                        {results.length > 0 ? (
                            results.map(user => (
                                <Typography key={user.userId} variant="body1">
                                    {user.name} {user.surname} - TCKN: {user.tckn}
                                </Typography>
                            ))
                        ) : (
                            <Typography>No results found</Typography>
                        )}
                    </Box>
                </Box>
            </main>
        </div>
    );
}