import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './HomePage.css';
import './UserQuery.js';
import zaferImage from './ZaferB.jpg';
import oznurAbla from './OznurAbla.jpeg';
import mehmetEmin from './MehmetEmin.jpeg';

export default function HomePage() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const location = useLocation(); 

    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');

    useEffect(() => {
        const loggedInUserName = location.state?.userName || 'John Doe';  
        setUserName(loggedInUserName);
        const userInitials = loggedInUserName.split(' ').map(name => name[0]).join('');
        setInitials(userInitials);
    }, [location]);

    // İlk satırdaki görsel verisi
    const itemDataRow1 = [
        {
            img: zaferImage,
            title: 'ZaferB',
        },
        {
            img: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Hazine_M%C3%BCste%C5%9Farl%C4%B1%C4%9F%C4%B1.jpg',
            title: 'Ana Bina',
        },
        {
            img: 'https://www.gurbag.com/uploads/tamamlanan/mayem/mayem_giris_(large).jpg',
            title: 'Ek Bina 1',
        },
        {
            img: 'https://i.ekonomim.com/2/1280/720/storage/files/images/2024/07/30/mehmet-simsekten-kredi-degerlendirmesi-dunya-bankasinin-duydugu-guvenin-gostergesi-uneu_cover.jpg.webp',
            title: 'Bakan',
        },
        {
            img: 'https://www.gurbag.com/uploads/tamamlanan/mayem/mayem02_(large).jpg',
            title: 'Ek Bina 2',
        },
    ];

    // İkinci satırdaki görsel verisi
    const itemDataRow2 = [
        {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Ataturk1930s.jpg/220px-Ataturk1930s.jpg',
            title: 'Atatürk',
        },
        {
            img: 'https://marketplace.canva.com/EAE_Q2TC-yA/1/0/900w/canva-k%C4%B1rm%C4%B1z%C4%B1-mavi-siyah-19-may%C4%B1s-atat%C3%BCrk%C3%BC-anma-gen%C3%A7lik-ve-spor-bayram%C4%B1-instagram-hikayesi-r7ri5gzkgkI.jpg',
            title: '19 Mayıs',
        },
        {
            img: 'https://www.tccb.gov.tr/assets/resim/genel/receptayyiperdogan-bio.jpg',
            title: 'Photo 9',
        },
        {
            img: oznurAbla,
            title: 'Oznur Abla',
        },
        {
            img: mehmetEmin,
            title: 'Emin abi',
        },
    ];

    return (
        <div className="homepage">
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
                    <li onMouseEnter={handleMenuOpen} onClick={handleMenuOpen}>Services</li>
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
                <MenuItem onClick={() => navigate('/leave-application')}>
                    İzin Başvurusu
                </MenuItem>
                <MenuItem onClick={() => {
                    navigate('/user-query');
                    handleMenuClose();
                }}>
                    Kullanıcı Sorgulama
                </MenuItem>
                <MenuItem onClick={() => {
                    navigate('/deneme');
                    handleMenuClose();
                }}>
                    Deneme
                </MenuItem>
            </Menu>
            <main className="content">
                <Box className="image-list-row">
                    <ImageList
                        sx={{
                            display: 'flex',
                            gap: '0px',
                            padding: '0',
                            margin: '0',
                        }}
                    >
                        {itemDataRow1.map((item) => (
                            <ImageListItem
                                key={item.img}
                                sx={{
                                    flex: '1 0 0px',
                                    margin: '0',
                                    padding: '0',
                                    height: 'auto',
                                }}
                            >
                                <img
                                    src={`${item.img}?w=248&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                        margin: '0',
                                        padding: '0',
                                    }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
                <Box className="image-list-row">
                    <ImageList
                        sx={{
                            display: 'flex',
                            gap: '0px',
                            padding: '0',
                            margin: '0',
                        }}
                    >
                        {itemDataRow2.map((item) => (
                            <ImageListItem
                                key={item.img}
                                sx={{
                                    flex: '1 0 0px',
                                    margin: '0',
                                    padding: '0',
                                    height: '100px',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={`${item.img}?w=248&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        margin: '0',
                                        padding: '0',
                                    }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
            </main>
            <footer className="footer">
                <p>© 2024 Ministry of Treasury and Finance. All rights reserved.</p>
            </footer>
        </div>
    );
}
