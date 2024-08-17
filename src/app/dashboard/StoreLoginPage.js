import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Numpad from './NumPad';

const StoreLoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (code) => {
    const correctCode = '1234';
    if (code === correctCode) {
      navigate('/dashboard');
    } else {
      alert('Incorrect code. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f6f8' }}>
      <Numpad onSubmit={handleLogin} />
    </Box>
  );
};

export default StoreLoginPage;
