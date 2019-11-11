import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    minWidth: '100px',
    maxWidth: '200px',
    height: '50px',
    margin: "8px",
    background: 'rgb(226,231,238)',
    boxSizing: 'border-box',
  },
  cardContent: {
    padding: '4px',
  }
});

function MetricTag({name}) { // prop is a
  // get last known measurement goes here
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant='body2'>{name}</Typography>
        <Typography variant={"subtitle2"}>{'100.00'}</Typography>
      </CardContent>
    </Card>
  );
}

export default MetricTag
