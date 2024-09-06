import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logo from './logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ProfilePanel from './ProfilePanel'; 
import zaferImage from './ZaferB.jpg';
import oznurAbla from './OznurAbla.jpeg';
import mehmetEmin from './MehmetEmin.jpeg';
import { AppBar, Toolbar, Typography, Button} from '@mui/material';

export default function HomePage() {
    const navigate = useNavigate();

    // Services menüsü için state
    const [servicesAnchorEl, setServicesAnchorEl] = React.useState(null);

    // UserName menüsü için state
    const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);

    // Services menüsünü açma/kapama
    const handleServicesMenuOpen = (event) => {
        setServicesAnchorEl(event.currentTarget);
    };

    const handleServicesMenuClose = () => {
        setServicesAnchorEl(null);
    };

    // Profil menüsünü açma/kapama
    const handleProfileMenuOpen = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };

    const handleLogout = () => {
        console.log('Çıkış yapıldı');
        navigate('/');
    };

    const [userName, setUserName] = useState('');
    const [initials, setInitials] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName') || 'John Doe';
        setUserName(storedUserName);
    
        const userInitials = storedUserName.split(' ').map(name => name[0]).join('');
        setInitials(userInitials);
    }, []);
    

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

    /*const itemDataRow2 = [
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
    ]*/

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
                    <li onClick={() => navigate('/home')}>Dashboard</li>
                    <li 
                        onMouseEnter={handleServicesMenuOpen} 
                        onClick={handleServicesMenuOpen}
                    >
                        Services
                    </li>
                    <li onClick={() => navigate('/contact')}>Contact</li>
                </ul>
                {/* Sağ üst köşede profil kısmı */}
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
                anchorEl={servicesAnchorEl}
                open={Boolean(servicesAnchorEl)}
                onClose={handleServicesMenuClose}
                MenuListProps={{
                    onMouseLeave: handleServicesMenuClose,
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
                <MenuItem onClick={() => navigate('/leave-application')}>
                    İzin Başvurusu
                </MenuItem>
                <MenuItem onClick={() => navigate('/userquery')}>
                    Kullanıcı Sorgulama
                </MenuItem>
            </Menu>

            {/* Kullanıcı adı menüsü */}
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
                    Profil Ayarları
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    Çıkış Yap
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
            </main>
            <footer className="footer">
                <p>© 2024 Ministry of Treasury and Finance. All rights reserved.</p>
            </footer>
        </div>
    );
}
