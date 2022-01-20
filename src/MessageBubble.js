import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';



export default function MessageBubble(props) {

    return (
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.message.user}
                </Typography>
                <Typography variant="h5" component="div">
                    {props.message.content}
                </Typography>
            </CardContent>
        </Card>
    )
}