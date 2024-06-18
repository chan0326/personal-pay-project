import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Link, Box } from '@mui/material';
import { PG } from '../enums/PG';
import { useDispatch } from 'react-redux';
import { parseCookies, destroyCookie } from 'nookies';
import { logout } from '../../user/service/user-service';
import { jwtDecode } from 'jwt-decode';

function Header() {
  const [showMyPage, setShowMyPage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.accessToken === undefined) {
      setShowMyPage(false);
    } else {
      setShowMyPage(true);
    }
  }, []);

  const logoutHandler = () => {
    dispatch(logout())
      .then(() => {
        destroyCookie(null, 'accessToken');
        setShowMyPage(false);
      })
      .catch((err: any) => {
        console.error('로그아웃 에러:', err);
      });
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" color="inherit" underline="none" sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
            <Typography variant="h6" component="div">
              Toeic! Doit!
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link href="#" color="inherit" underline="none" sx={{ mx: 1 }}>
            Courses
          </Link>
          <Link href="#" color="inherit" underline="none" sx={{ mx: 1 }}>
            Challenges
          </Link>
          <Link href={`${PG.ARTICLE}/review`} color="inherit" underline="none" sx={{ mx: 1 }}>
            Reviews
          </Link>
          <Link href={`${PG.ARTICLE}/list/1`} color="inherit" underline="none" sx={{ mx: 1 }}>
            Community
          </Link>
          <Link href={`${PG.ARTICLE}/list/2`} color="inherit" underline="none" sx={{ mx: 1 }}>
            FAQ
          </Link>
          <Link href="#" color="inherit" underline="none" sx={{ mx: 1 }}>
            Roadmap
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {!showMyPage && (
            <>
              <Button color="inherit" href={`${PG.USER}/login`}>Login</Button>
              <Button color="primary" variant="contained" href={`${PG.USER}/join`}>Join</Button>
            </>
          )}
          {showMyPage && (
            <>
              <Button color="inherit" href="#">강의실 입장</Button>
              <Button color="inherit" href={`${PG.USER}/detail/${jwtDecode<any>(parseCookies().accessToken).userId}`}>마이페이지</Button>
              <Button color="inherit" href={`${PG.PAYMENT}/${jwtDecode<any>(parseCookies().accessToken).userId}`}>Payment</Button>
              <Button color="inherit" href={`${PG.Calendar}/${jwtDecode<any>(parseCookies().accessToken).userId}`}>캘린더</Button>
              <Button color="inherit" onClick={logoutHandler}>Logout</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
