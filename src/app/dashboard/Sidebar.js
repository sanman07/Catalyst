// Sidebar.js
import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => {
  return (
    <Box sx={{ width: '250px', backgroundColor: 'white', height: '100vh', padding: '20px', borderRadius:'20px 0 0 20px', margin:'10px'}}>
      <h3>Store Admin</h3>
      <List>
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Inventory" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Feedback" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
