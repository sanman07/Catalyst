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
    <Box sx={{ width: '250px', backgroundColor: 'white', maxHeight: '85vh', borderRadius:'20px 0 0 20px', margin:'10px'}}>
      <h3 style={{padding: '20px', textAlign:'center', marginTop:'20px'}}>Store Admin</h3>
      <List style={{ paddingRight: '20px' }}>
        <ListItem
          button
          sx={{
            marginTop: '20px',
            marginBottom: '20px',
            paddingTop: '15px',
            paddingBottom: '15px',
            backgroundColor: selectedMenu === 'dashboard' ? '#e0f7fa' : 'transparent',
            boxShadow: selectedMenu === 'dashboard' ? '2px 1px 2px rgba(0, 0, 0, 0.2)' : '0',
            '&:hover': {
              backgroundColor: '#e0f7fa',
            },
            borderRadius: '0 15px 15px 0',
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
            boxShadow: selectedMenu === 'inventory' ? '2px 1px 2px rgba(0, 0, 0, 0.2)' : '0',
            '&:hover': {
              backgroundColor: '#e0f7fa',
            },
            borderRadius: '0 15px 15px 0',
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
            boxShadow: selectedMenu === 'feedback' ? '2px 1px 2px rgba(0, 0, 0, 0.2)' : '0',
            '&:hover': {
              backgroundColor: '#e0f7fa',
            },
            borderRadius: '0 15px 15px 0',
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
