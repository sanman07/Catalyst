import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { keyframes } from '@emotion/react';

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card
        sx={{
          padding: '10px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: 
            bounce && status === 'Occupied' ? '#ff8080' :
            status === 'Occupied' ? '#ffcccc' :
            status === 'Reserved' ? '#cceeff' : 
            '#e0f7e0',
          animation: bounce ? `${bounceAnimation} 0.5s infinite` : 'none',
          '&:hover': {
            backgroundColor: 
              status === 'Occupied' ? '#ff9999' :
              status === 'Reserved' ? '#99d6ff' : 
              '#c2f2c2',
          },
        }}
        onClick={handleClickOpen}
      >
        <Typography variant="h6">Room {roomNumber}</Typography>
        {items && items.length > 0 ? (
          <Typography variant="body2">Items: {items.length}</Typography>
          ) : (
            <Typography variant="body2">Available</Typography>
        )}
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Room {roomNumber} Details</DialogTitle>
        <DialogContent>
          {request ? (
            <>
              <Typography variant="body1" sx={{font:'Bold'}}>Request:</Typography>
              <Typography variant="body2" sx={{ textAlign: 'center' }}>{request}</Typography>
            </>
          ) : (
            <>
              {items.length > 0 ? (
                <>
                  <Typography variant="body1">Items in the Room:</Typography>
                  <ul>
                    {}
                    {items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
                ) : (
                  <Typography variant="body2">Available</Typography>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TryoutRoom;
