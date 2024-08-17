import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBoxOpen, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onMenuClick }) => {
  return (
    <Box sx={{ width: '250px', backgroundColor: 'white', height: '100vh', padding: '20px', borderRadius:'20px 0 0 20px', margin:'10px'}}>
      <h3>Store Admin</h3>
      <List>
        <ListItem button onClick={() => onMenuClick('dashboard')}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faHome} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('inventory')}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faBoxOpen} />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('feedback')}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faCommentDots} />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
