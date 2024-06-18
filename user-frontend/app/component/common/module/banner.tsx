import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function Banner() {
  return (
    <Box sx={{ backgroundImage: 'url(https://source.unsplash.com/random)', height: '300px', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', p: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Toeic! Doit!
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Master TOEIC with the best online courses
      </Typography>
      <Button variant="contained" color="primary" href="/courses">
        Start Learning
      </Button>
    </Box>
  );
}

export default Banner;