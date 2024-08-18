import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import TryoutRoom from './TryoutRoom';

const DashboardContent = () => {
  const [rooms, setRooms] = useState([
    { roomNumber: 1, status: 'Available', items: [], request: null },
    { roomNumber: 2, status: 'Occupied', items: ['Adidas Hoodie','Nike Sweatshirt'], request: null },
    { roomNumber: 3, status: 'Available', items: [], request: null },
    { roomNumber: 4, status: 'Occupied', items: ['Adidas Hoodie','Nike Sweatshirt'], request: null },
    { roomNumber: 5, status: 'Available', items: [], request: null },
  ]);

  useEffect(() => {
    const fetchProductsAndRequests = async () => {
      try {
        // Fetch products
        const productRes = await fetch('http://127.0.0.1:5000/get-products');
        const productsData = await productRes.json();

        // Fetch trial requests
        const requestRes = await fetch('http://127.0.0.1:5000/get-trial-requests');
        const requestsData = await requestRes.json();

        // Filter products to include only clothing items
        const clothingItems = productsData.filter(product =>
          (product.category === "men's clothing" || product.category === "women's clothing") && 
          !product.title.includes("Fjallraven")
        );

        // Update the rooms with the filtered clothing items and append requests
        const updatedRooms = rooms.map(room => {
          if (room.roomNumber === 2 || room.roomNumber === 4) {
            const roomItems = clothingItems
              .filter(item => item.stallNo === room.roomNumber)
              .map(item => item.title);

            const roomRequests = requestsData
              .filter(request => request.stallNo === room.roomNumber)
              .map(request => request.request);

            return {
              ...room,
              items: roomItems,
              request: roomRequests.length > 0 ? roomRequests.join(', ') : room.request,
            };
          }
          return room;
        });

        setRooms(updatedRooms);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial fetch
    fetchProductsAndRequests();

    // Polling every 5 seconds to check for updates
    const interval = setInterval(fetchProductsAndRequests, 5000);

    // Cleanup interval on unmount
    return() =>clearInterval(interval);
  }, []);

  const handleClearRequest = async (roomNumber) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/clear-request/${roomNumber}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // If the API request was successful, update the state to clear the request for the room
        setRooms(rooms.map(room =>
          room.roomNumber === roomNumber
            ? { ...room, request: null }
            : room
        ));
        alert(`Request cleared for Room ${roomNumber}`);
      } else {
        alert('Failed to clear the request.');
      }
    } catch (error) {
      console.error('Error clearing request:', error);
      alert('Error clearing the request.');
    }
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
