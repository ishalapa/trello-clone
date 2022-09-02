import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material'

import React from 'react'

const MediaCard = ({header, text, img}) => {
  return (
    <Grid md={3} item>
      <Card sx={{ width: 260 }}>
      <CardMedia component="img" image={img} height="130"></CardMedia>
      <CardContent>
        <Typography variant="h5">{header}</Typography>
        <Typography variant="body2">{text}</Typography>
      </CardContent>
    </Card>
    </Grid>
    
  )
}

export default MediaCard
