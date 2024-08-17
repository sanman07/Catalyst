import React from 'react';
import { Box, InputBase, Typography } from '@mui/material';

const TopBar = () => {
  return (
    <Box sx={{ borderRadius:'0 20px 0 0', marginTop:'10px',  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#ffffff' }}>
      <Typography variant="body1">Team Member</Typography>
      <a>
        <button>
            <Typography variant="body1">Logout</Typography>
        </button>
      </a>
    </Box>
  );
};

export default TopBar;
