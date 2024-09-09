import React, { useState, useEffect } from 'react';
import './UserQuery.css';
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
    
    // Kullanıcı adı ve baş harflerini tutmak için state oluşturuyoruz
    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [tckn, setTckn] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [results, setResults] = useState([]);



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
                setResults(data);
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
    const rows = results.map((user, index) => ({
        id: index + 1, // Her kullanıcıya unique bir ID veriyoruz, backend'den gelen id varsa kullan
        firstName: user.firstName,
        lastName: user.lastName,
        TCKN: user.TCKN
    }));

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
                    <li onClick={() => handleNavigation('/home')}>Dashboard</li>
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
                <MenuItem onClick={() => handleSubPageNavigation('/leaveapplication')}>
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
                </Box>
            </main>
        </div>
    );
}
