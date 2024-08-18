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


  return (
    <Box sx={{backgroundColor: 'white', 
      padding: '20px', 
      height: '91vh',  
      flexGrow:1, 
      marginTop: '10px', 
      borderRadius: '20px',
      maxWidth: '145vh',
      maxHeight: '70vh',
      marginBottom: '10px',
      boxShadow: '02px10pxrgba(0, 0, 0, 0.1)',
    }}><Typography variant="h5" sx={{ marginBottom: '20px' }}>Manage Tryout Rooms</Typography><Grid container spacing={3}>
        {rooms.map(room => (
          <Grid itemxs={4}key={room.roomNumber}><TryoutRoom {...room} /></Grid>
        ))}
      </Grid></Box>
  );
};

export default DashboardContent;
