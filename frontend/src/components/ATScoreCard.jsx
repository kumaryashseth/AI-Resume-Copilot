import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const ATScoreCard = ({score}) => {
  return (
    <Card>
        <CardContent>

        <Typography variant='h4'>ATScore</Typography>
        <Typography variant='h2'>{score}%</Typography>
        
        </CardContent>

    </Card>

  )
}

export default ATScoreCard