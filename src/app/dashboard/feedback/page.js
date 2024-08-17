import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Rating from '@mui/material/Rating';

const feedbackData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    message: 'Great service, really enjoyed the experience!',
    rate: 5
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    message: 'The product quality was excellent, but delivery was delayed.',
    rate: 3
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michaeljohnson@example.com',
    message: 'System was not useful',
    rate: 1
  },
  {
    id: 4,
    name: 'Guest',
    email: 'Guest',
    message: 'The product was great, but the customer service was not helpful.',
    rate: 2
  },
  // Add more feedback entries as needed
];

const Feedback = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        height: '91vh',  
        flexGrow: 1, 
        marginTop: '10px', 
        borderRadius: '0 0 20px 0',
        maxWidth:'145vh',
        borderRadius: '20px', 
        maxHeight:'70vh',
        marginBottom:'10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: '600' }}>Customer Feedbacks</Typography>

      <Box sx={{ height: 'calc(100% - 60px)', overflowY: 'auto', paddingRight: '10px' }}>
        <Grid container spacing={3}>
          {feedbackData.map((feedback) => (
            <Grid item xs={12} key={feedback.id}>
              <Paper sx={{ padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h6" sx={{ marginBottom: '5px', fontWeight: '500' }}>{feedback.name}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>{feedback.email}</Typography>
                <Typography variant="body1">{feedback.message}</Typography>
                <Rating name="feedback-rate" value={feedback.rate} readOnly />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Feedback;