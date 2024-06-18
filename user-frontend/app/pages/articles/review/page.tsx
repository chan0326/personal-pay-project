import React from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar, Link } from '@mui/material';

const reviews = [
  {
    username: 'actionmooo...',
    avatar: 'https://flowbite.com/docs/images/logo.svg',
    date: '오늘',
    content: 'You are an awesome instructor, seriously!!',
    link: 'Python으로 웹 스크래퍼 만들기'
  },
  {
    username: '0626na',
    avatar: 'https://flowbite.com/docs/images/logo.svg',
    date: '그저께',
    content: '역시 처음에 배울때는 잘아는 누군가에게 배우는게 좋은거 같네요. 혼자 공식문서보면서 할때는 윈소린지를 몰랐던 것들을 니코쌤 강의 쪽 보면서 많이 얻어갑니다. 언제나 좋은강의 감사!',
    link: '[풀스택] 개럿마켓 클론코딩'
  },
  {
    username: 'ejseo2021',
    avatar: 'https://flowbite.com/docs/images/logo.svg',
    date: '그저께',
    content: '넷플릭스, 유튜브 시청보다 더 재미있었던 toonflix 코딩^^ 틱톡 클론 코딩도 기대됩니다.',
    link: 'Flutter 로 웹툰 앱 만들기'
  }
];

function Review() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Reviews
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        수강생들의 솔직 100% 찐 후기!
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" sx={{ mx: 1 }}>모두</Button>
        <Button variant="contained" color="secondary" sx={{ mx: 1 }}>강의</Button>
        <Button variant="contained" color="secondary" sx={{ mx: 1 }}>챌린지</Button>
      </Box>
      {reviews.map((review, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar src={review.avatar} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="body1">{review.username}</Typography>
                <Typography variant="body2" color="textSecondary">{review.date}</Typography>
              </Box>
            </Box>
            <Typography variant="body1" gutterBottom>{review.content}</Typography>
            <Link href="#" underline="hover">{review.link}</Link>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Review;
