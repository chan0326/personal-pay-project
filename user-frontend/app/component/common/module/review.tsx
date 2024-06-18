import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';

const reviews = [
  { name: "actionmooo...", review: "You are an awesome instructor, seriously!!", avatar: "https://i.pravatar.cc/150?img=1" },
  { name: "0626na", review: "역시 처음에 배울때는 잘아는 누군가에게 배우는게 좋은거 같네요.", avatar: "https://i.pravatar.cc/150?img=2" },
  { name: "ejseo2021", review: "넷플릭스, 유튜브 시청보다 더 재미있었던...", avatar: "https://i.pravatar.cc/150?img=3" },
];

function Reviews() {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Reviews
      </Typography>
      <Grid container spacing={4}>
        {reviews.map((review, index) => (
          <Grid item key={index} xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={review.avatar} />
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    {review.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {review.review}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Reviews;
