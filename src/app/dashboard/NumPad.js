import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

const Numpad = ({ onSubmit }) => {
  const [code, setCode] = useState('1111'); //change later to have security

  const handleButtonClick = (digit) => {
    if (code.length < 4) {
      setCode(code + digit);
    }
  };

  const handleDelete = () => {
    setCode(code.slice(0, -1));
  };

  const handleSubmit = () => {
    if (code.length === 4) {
      onSubmit(code);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width:'40%', alignItems: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: '500', fontSize: '1.5rem' }}>Enter Store Code</Typography>
      <Typography variant="h4">{code.replace(/./g, '●')}</Typography>
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
          <Grid item xs={4} key={num}>
            <Button variant="contained" sx={{
              width: '100%',
              height: '60px',
              fontSize: '1.25rem',
              backgroundColor: '#007bff',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
              transition: 'background-color 0.3s',
            }} onClick={() => handleButtonClick(num.toString())}>
              {num}
            </Button>
          </Grid>
        ))}
        <Grid item xs={4}>
          <Button variant="contained" sx={{
            width: '100%',
            height: '60px',
            fontSize: '1.25rem',
            backgroundColor: '#6c757d',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#5a6268',
            },
            transition: 'background-color 0.3s',
          }} onClick={handleDelete}>
            DEL
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" sx={{ width: '100%', height: '60px' }} onClick={() => handleButtonClick('0')}>
            0
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" sx={{ width: '100%', height: '60px', backgroundColor:"green" }} onClick={handleSubmit}>
            OK
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Numpad;
