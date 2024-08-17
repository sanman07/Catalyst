import React from 'react';
import { Box, Card, Typography, Grid } from '@mui/material';
import TryoutRoom from './TryoutRoom';

const DashboardContent = () => {
  const rooms = [
    { roomNumber: 1, status: 'Available', items: [], request:null },
    { roomNumber: 2, status: 'Occupied', items: ['Shirt', 'Pants', 'Shoes'], request:"Request for size M in Shirt" },
    { roomNumber: 3, status: 'Available', items: [], request:null },
    { roomNumber: 4, status: 'Occupied', items: ['Shirt', 'Pants', 'Shoes'], request:null },
    { roomNumber: 5, status: 'Available', items: [], request:null },
  ];

  return (
    <Box sx={{ backgroundColor:'white', padding: '20px', height: '92vh',  flexGrow: 1, marginTop:'10px', borderRadius:'0 0 20px 0'}}>
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>Manage Tryout Rooms</Typography>
      <Grid container spacing={3}>
        {rooms.map(room => (
          <Grid item xs={4} key={room.roomNumber}>
            <TryoutRoom {...room} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardContent;
