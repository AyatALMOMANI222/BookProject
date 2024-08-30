import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function StatCard({ title, value, icon }) {
    return (
        <Card sx={{ minWidth: 275, mb: 2, background:"black", color:"white"}}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        {icon}
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>
                        <Typography variant="h4" component="div">
                            {value}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default StatCard;
