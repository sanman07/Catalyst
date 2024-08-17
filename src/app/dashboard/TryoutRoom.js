import React, { useState } from 'react';
import { Box, Card, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';

const TryoutRoom = ({ roomNumber, status, items }) => {
  const [open, setOpen] = useState(false);

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
            backgroundColor: status === 'Occupied' ? '#ffcccc' : status === 'Reserved' ? '#cceeff' : '#e0f7e0',
            '&:hover': {
              backgroundColor: status === 'Occupied' ? '#ff9999' : status === 'Reserved' ? '#99d6ff' : '#c2f2c2',
            },
          }}
        onClick={handleClickOpen}
      >
        <Typography variant="h6">Room #{roomNumber}</Typography>
        <Typography variant="body2">Items: {items.length}</Typography>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Room #{roomNumber} Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Items in the Room:</Typography>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TryoutRoom;