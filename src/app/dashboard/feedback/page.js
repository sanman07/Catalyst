import React from 'react';
import { Box, Typography } from '@mui/material';

const Feedback = () => {
  return (
    <Box sx={{ backgroundColor:'white', padding: '20px', height: '91vh',  flexGrow: 1, marginTop:'10px', borderRadius:'0 0 20px 0'}}>
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>Feedback Page</Typography>
    </Box>
  );
};

export default Feedback;
