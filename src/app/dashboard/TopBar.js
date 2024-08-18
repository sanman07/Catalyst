import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const TopBar = ({ onLogout }) => {
  return (
    <Box sx={{ height:'10vh', borderRadius:'15px', marginTop:'10px',  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#ffffff' }}>
      <Typography variant="h6">Team Member</Typography>
      <Button 
        onClick={onLogout}
        style={{ background: 'white'}}
      >
        <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#002e7a", width:'23px', height:'23px'}} />
      </Button>
    </Box>
  );
};

export default TopBar;
