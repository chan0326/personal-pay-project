import React from 'react';
import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ p: 4, backgroundColor: '#333', color: 'white', textAlign: 'center' }}>
      <Typography variant="body2" component="p">
        &copy; {new Date().getFullYear()} Toeic! Doit! All rights reserved.
      </Typography>
      <Link href="/privacy" color="inherit" sx={{ mx: 1 }}>
        Privacy Policy
      </Link>
      <Link href="/terms" color="inherit" sx={{ mx: 1 }}>
        Terms of Service
      </Link>
    </Box>
  );
}

export default Footer;
