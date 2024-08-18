import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import TryoutRoom from './TryoutRoom';

const DashboardContent = () => {
  const [rooms, setRooms] = useState([
    { roomNumber: 1, status: 'Available', items: [], request: null },
    { roomNumber: 2, status: 'Occupied', items: [], request: "Request for size M in Shirt" },
    { roomNumber: 3, status: 'Available', items: [], request: null },
    { roomNumber: 4, status: 'Occupied', items: [], request: null },
    { roomNumber: 5, status: 'Available', items: [], request: null },
  ]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get-products')
      .then((res) => res.json())
      .then((data) => {
        // Filter products to include only clothing items
        const clothingItems = data.filter(product =>
          (product.category === "men's clothing" || product.category === "women's clothing") && 
          !product.title.includes("Fjallraven")
        );

        // Update the rooms with the clothing items
        const updatedRooms = rooms.map(room => {
          if (room.roomNumber === 2 || room.roomNumber === 4) {
            const roomItems = clothingItems.map(item => item.title);
            return { ...room, items: roomItems };
          }
          return room;
        });

        setRooms(updatedRooms);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, [rooms]);

  const handleClearRequest = (roomNumber) => {
    setRooms(rooms.map(room =>
      room.roomNumber === roomNumber
        ? { ...room, request: null }
        : room
    ));
  };

  return (
    <Box sx={{ 
      backgroundColor: 'white', 
      padding: '20px', 
      height: '91vh',  
      flexGrow: 1, 
      marginTop: '10px', 
      borderRadius: '20px',
      maxWidth: '145vh',
      maxHeight: '70vh',
      marginBottom: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    }}>
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>Manage Tryout Rooms</Typography>
      <Grid container spacing={3}>
        {rooms.map(room => (
          <Grid item xs={4} key={room.roomNumber}>
            <TryoutRoom {...room} onClearRequest={handleClearRequest} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardContent;
