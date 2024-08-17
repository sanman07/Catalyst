import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBoxOpen, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onMenuClick }) => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    onMenuClick(menu);
  };

  return (
    <Box sx={{ width: '250px', backgroundColor: 'white', maxHeight: '85vh', padding: '20px', borderRadius:'20px 0 0 20px', margin:'10px'}}>
      <h3>Store Admin</h3>
      <List style={{ paddingTop: '30px' }}>
        <ListItem
          button
          sx={{
            marginTop: '20px',
            marginBottom: '20px',
            paddingTop: '15px',
            paddingBottom: '15px',
            backgroundColor: selectedMenu === 'dashboard' ? '#e0f7fa' : 'transparent',
            '&:hover': {
              backgroundColor: '#e0f7fa',
            },
            borderRadius: '10px',
          }}
          onClick={() => handleMenuClick('dashboard')}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faHome} style={{ color: selectedMenu === 'dashboard' ? '#002e7a' : 'black' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          sx={{
            marginTop: '20px',
            marginBottom: '20px',
            paddingTop: '15px',
            paddingBottom: '15px',
            backgroundColor: selectedMenu === 'inventory' ? '#e0f7fa' : 'transparent',
            '&:hover': {
              backgroundColor: '#e0f7fa',
            },
            borderRadius: '10px',
          }}
          onClick={() => handleMenuClick('inventory')}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faBoxOpen} style={{ color: selectedMenu === 'inventory' ? '#002e7a' : 'black' }} />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem>
        <ListItem
          button
          sx={{
            marginTop: '20px',
            marginBottom: '20px',
            paddingTop: '15px',
            paddingBottom: '15px',
            backgroundColor: selectedMenu === 'feedback' ? '#e0f7fa' : 'transparent',
            '&:hover': {
              backgroundColor: '#e0f7fa',
            },
            borderRadius: '10px',
          }}
          onClick={() => handleMenuClick('feedback')}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faCommentDots} style={{ color: selectedMenu === 'feedback' ? '#002e7a' : 'black' }} />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
