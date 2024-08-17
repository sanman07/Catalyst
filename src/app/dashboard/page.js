'use client';
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar.js';
import Dashboard from './DashboardContent.js';
import TopBar from './TopBar.js';

const Page = () => {
  return (
    <Box sx={{ backgroundColor:'#f4f6f8', display: 'flex', marginTop: '50px', borderRadius: '20%' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <TopBar />
        <Dashboard />
      </Box>
    </Box>
  );
};

export default Page;
