import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const courses = [
  { title: "TOEIC Listening", description: "Improve your listening skills.", image: "https://source.unsplash.com/random/1" },
  { title: "TOEIC Reading", description: "Boost your reading comprehension.", image: "https://source.unsplash.com/random/2" },
  { title: "TOEIC Vocabulary", description: "Expand your TOEIC vocabulary.", image: "https://source.unsplash.com/random/3" },
];

function RecommendedCourses() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Recommended Courses
      </Typography>
      <Grid container spacing={4}>
        {courses.map((course, index) => (
          <Grid item key={index} xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
                <Button size="small" color="primary" href="/course-detail">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RecommendedCourses;
