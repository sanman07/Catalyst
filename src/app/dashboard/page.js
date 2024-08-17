'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar.js';
import Dashboard from './DashboardContent.js';
import TopBar from './TopBar.js';
import Numpad from './NumPad.js';
import Inventory from './inventory/page.js';
import Feedback from './feedback/page.js';

const Page = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard'); 

  const handleLogin = (code) => {
    const correctCode = '1111';
    if (code === correctCode) {
      setAuthenticated(true);
    } else {
      alert('Incorrect code. Please try again.');
    }
  };
  
  const handleLogout = () => {
    setAuthenticated(false); 
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!authenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f6f8' }}>
        <Numpad onSubmit={handleLogin} />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f4f6f8', display: 'flex', marginTop: '30px', borderRadius: '20%' }}>
      <Sidebar onMenuClick={handlePageChange} />
      <Box sx={{ flexGrow: 1 }}>
        <TopBar onLogout={handleLogout} />
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'inventory' && <Inventory />}
        {currentPage === 'feedback' && <Feedback/>}
      </Box>
    </Box>
  );
};

export default Page;
