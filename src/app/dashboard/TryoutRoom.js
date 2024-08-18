import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { keyframes } from '@emotion/react';

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); } // Reduced bounce for a subtle effect
`;

const TryoutRoom = ({ roomNumber, status, items, request }) => {
  const [open, setOpen] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (request) {
      setBounce(true);
    }
  }, [request]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClearRequest = async () => {
    try {
      const response = awaitfetch(`http://127.0.0.1:5000/clear-request/${roomNumber}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(`Request cleared for Room ${roomNumber}`);
        setBounce(false); // Stop bouncing animation after 
        clearinghandleClose(); // Close the dialog
      } else {
        alert('Failed to clear the request.');
      }
    } catch (error) {
      console.error('Error clearing request:', error);
      alert('Error clearing the request.');
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card
        sx={{
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: 
            bounce && status === 'Occupied' ? '#ff8080' :
            status === 'Occupied' ? '#ffcccc' :
            status === 'Reserved' ? '#cceeff' : 
            '#e0f7e0',
          animation: bounce ? `${bounceAnimation} 1s infinite` : 'none',
          '&:hover': {
            backgroundColor: 
              status === 'Occupied' ? '#ff9999' :
              status === 'Reserved' ? '#99d6ff' : 
              '#c2f2c2',
            //boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Add subtle shadow on hover
          },
          borderRadius: '12px', // Slightly more rounded corners
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // Smooth transition
          //boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}
        onClick={handleClickOpen}
      >
        <Typography variant="h6" sx={{ fontWeight: '600' }}>Room {roomNumber}</Typography>
        {items && items.length > 0 ? (
          <Typography variant="body2" sx={{ marginTop: '10px' }}>Items: {items.length}</Typography>
        ) : (
          <Typography variant="body2" sx={{ marginTop: '10px' }}>Available</Typography>
        )}
      </Card>

      <Dialog open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { borderRadius: '12px', padding: '20px' } }}>
        <DialogTitle sx={{ fontWeight: '600', fontSize: '20px', textAlign: 'center' }}>Room {roomNumber} Details</DialogTitle>
        <DialogContent>
          {request ? (
            <>
              <Typography variant="body1" sx={{ fontWeight: '700', marginBottom: '10px' }}>Request:</Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', marginBottom: '20px' }}>{request}</Typography>
            </>
          ) : (
            <>
              {items.length > 0 ? (
                <>
                  <Typography variant="body1" sx={{ fontWeight: '700', marginBottom: '10px' }}>Items in the Room:</Typography>
                  <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                    {items.map((item, index) => (
                      <li key={index} style={{ fontSize: '16px', marginBottom: '5px' }}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <Typography variant="body2" sx={{ textAlign: 'center', marginBottom: '10px' }}>Available</Typography>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TryoutRoom;
