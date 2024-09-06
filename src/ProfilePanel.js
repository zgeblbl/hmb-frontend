import React, { useState } from 'react';
import { Avatar, Popover, Typography } from '@mui/material';

const ProfilePanel = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      {/* Kullanıcı ismi ve avatar kısmı */}
      <div
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <Avatar sx={{ width: 32, height: 32 }}>ÖA</Avatar>
        <span style={{ marginLeft: '8px' }}>Öznur ASLAN</span>
      </div>

      {/* Panel (Popover) */}
      <Popover
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div style={{ padding: '10px' }}>
          <Typography variant="h6">Kullanıcı Bilgileri</Typography>
          <Typography variant="body2">Profil Ayarları</Typography>
          <Typography variant="body2">Çıkış Yap</Typography>
        </div>
      </Popover>
    </div>
  );
};

export default ProfilePanel;

/*<AppBar position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Ministry of Treasury and Finance
                </Typography>
                <Button color="inherit" onClick={handleLogout}>Çıkış Yap</Button>
                </Toolbar>
</AppBar> */