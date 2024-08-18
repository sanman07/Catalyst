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
    <Box sx={{ display: 'flex', flexDirection: 'column', width:'40%', alignItems: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '20px', justifyContent:'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: '500', fontSize: '1.5rem' }}>Enter Store Code</Typography>
      <Typography variant="h4">{code.replace(/./g, '●')}</Typography>
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
          <Grid item xs={4} key={num}>
            <Button 
              variant="contained" 
              sx={{
                appearance: 'button',
                backgroundColor: '#1899D6',
                border: 'solid transparent',
                borderRadius: '16px',
                borderWidth: '0 0 4px',
                boxSizing: 'border-box',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'inline-block',
                fontFamily: 'din-round, sans-serif',
                fontSize: '15px',
                fontWeight: '700',
                letterSpacing: '.8px',
                lineHeight: '20px',
                margin: '0',
                outline: 'none',
                overflow: 'visible',
                padding: '13px 16px',
                textAlign: 'center',
                textTransform: 'uppercase',
                touchAction: 'manipulation',
                transform: 'translateZ(0)',
                transition: 'filter .2s',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap',
                width: '100%',

                '&::after': {
                  backgroundClip: 'padding-box',
                  backgroundColor: '#1CB0F6',
                  border: 'solid transparent',
                  borderRadius: '16px',
                  borderWidth: '0 0 4px',
                  bottom: '-4px',
                  content: '""',
                  left: '0',
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  zIndex: '-1',
                },

                '&:hover:not(:disabled)': {
                  filter: 'brightness(1.1)',
                  WebkitFilter: 'brightness(1.1)',
                },

                '&:disabled': {
                  cursor: 'auto',
                },

                '&:active': {
                  borderWidth: '4px 0 0',
                  background: 'none',
                },
              }} 
              onClick={() => handleButtonClick(num.toString())}
            >
              {num}
          </Button>

          </Grid>
        ))}
        <Grid item xs={4}>
        <Button 
          variant="contained" 
          sx={{
            appearance: 'button',
            backgroundColor: '#6c757d',
            border: 'solid transparent',
            borderRadius: '16px',
            borderWidth: '0 0 4px',
            boxSizing: 'border-box',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'inline-block',
            fontFamily: 'din-round, sans-serif',
            fontSize: '1.25rem',
            fontWeight: '700',
            letterSpacing: '.8px',
            lineHeight: '20px',
            margin: '0',
            outline: 'none',
            overflow: 'visible',
            padding: '13px 16px',
            textAlign: 'center',
            textTransform: 'uppercase',
            touchAction: 'manipulation',
            transform: 'translateZ(0)',
            transition: 'background-color 0.3s, filter .2s',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            verticalAlign: 'middle',
            whiteSpace: 'nowrap',
            width: '100%',
            //height: '60px',

            '&::after': {
              backgroundClip: 'padding-box',
              backgroundColor: '#5a6268',
              border: 'solid transparent',
              borderRadius: '16px',
              borderWidth: '0 0 4px',
              bottom: '-4px',
              content: '""',
              left: '0',
              position: 'absolute',
              right: '0',
              top: '0',
              zIndex: '-1',
            },

            '&:hover:not(:disabled)': {
              filter: 'brightness(1.1)',
              WebkitFilter: 'brightness(1.1)',
              backgroundColor: '#495056',
            },

            '&:disabled': {
              cursor: 'auto',
            },

            '&:active': {
              borderWidth: '4px 0 0',
              background: 'none',
            },
          }} 
          onClick={handleDelete}
        >
          DEL
        </Button>

        </Grid>
        <Grid item xs={4}>
        <Button 
          variant="contained" 
          sx={{
            appearance: 'button',
            backgroundColor: '#1899D6',
            border: 'solid transparent',
            borderRadius: '16px',
            borderWidth: '0 0 4px',
            boxSizing: 'border-box',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'inline-block',
            fontFamily: 'din-round, sans-serif',
            fontSize: '15px',
            fontWeight: '700',
            letterSpacing: '.8px',
            lineHeight: '20px',
            margin: '0',
            outline: 'none',
            overflow: 'visible',
            padding: '13px 16px',
            textAlign: 'center',
            textTransform: 'uppercase',
            touchAction: 'manipulation',
            transform: 'translateZ(0)',
            transition: 'filter .2s',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            verticalAlign: 'middle',
            whiteSpace: 'nowrap',
            width: '100%',

            '&::after': {
              backgroundClip: 'padding-box',
              backgroundColor: '#1CB0F6',
              border: 'solid transparent',
              borderRadius: '16px',
              borderWidth: '0 0 4px',
              bottom: '-4px',
              content: '""',
              left: '0',
              position: 'absolute',
              right: '0',
              top: '0',
              zIndex: '-1',
            },

            '&:hover:not(:disabled)': {
              filter: 'brightness(1.1)',
              WebkitFilter: 'brightness(1.1)',
            },

            '&:disabled': {
              cursor: 'auto',
            },

            '&:active': {
              borderWidth: '4px 0 0',
              background: 'none',
            },
          }}  
          onClick={() => handleButtonClick('0')}
        >
          0
        </Button>

        </Grid>
        <Grid item xs={4}>
        <Button 
          variant="contained" 
          sx={{
            appearance: 'button',
            backgroundColor: '#3C861B',
            border: 'solid transparent',
            borderRadius: '16px',
            borderWidth: '0 0 4px',
            boxSizing: 'border-box',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'inline-block',
            fontFamily: 'din-round, sans-serif',
            fontSize: '1.25rem',
            fontWeight: '700',
            letterSpacing: '.8px',
            lineHeight: '20px',
            margin: '0',
            outline: 'none',
            overflow: 'visible',
            padding: '13px 16px',
            textAlign: 'center',
            textTransform: 'uppercase',
            touchAction: 'manipulation',
            transform: 'translateZ(0)',
            transition: 'background-color 0.3s, filter .2s',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            verticalAlign: 'middle',
            whiteSpace: 'nowrap',
            width: '100%',
            //height: '60px',

            '&::after': {
              backgroundClip: 'padding-box',
              backgroundColor: '#2e7d32',  // Darker shade of green for the bottom shadow
              border: 'solid transparent',
              borderRadius: '16px',
              borderWidth: '0 0 4px',
              bottom: '-4px',
              content: '""',
              left: '0',
              position: 'absolute',
              right: '0',
              top: '0',
              zIndex: '-1',
            },

            '&:hover:not(:disabled)': {
              filter: 'brightness(1.1)',
              WebkitFilter: 'brightness(1.1)',
              backgroundColor: '#388e3c', // Slightly darker green on hover
            },

            '&:disabled': {
              cursor: 'auto',
            },

            '&:active': {
              borderWidth: '4px 0 0',
              background: 'none',
            },
          }} 
          onClick={handleSubmit}
        >
          OK
        </Button>

        </Grid>
      </Grid>
    </Box>
  );
};

export default Numpad;
