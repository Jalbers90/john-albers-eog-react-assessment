import React from 'react';
import { Grid, Box, Paper, Typography } from '@material-ui/core';
import { Select, FormControl, InputLabel, MenuItem, Input, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MetricSelector from './MetricSelector';
import MetricTag from './MetricTag';
import Chart from './Chart';

const styles = makeStyles({
  paper: {
    padding: '16px' // todo: use theme.spacing
  },
  ['griditem-chart']: {
    flexGrow: 1
  }
});

function ChartContainer(props) {
  const classes = styles();

  return (
    <Box >
      <Paper className={classes.paper} >
        <Grid container  direction='column'>
          <Grid item>
            <Grid container>
              <MetricSelector />
              <MetricTag />
              <MetricTag />
              <MetricTag />
            </Grid>
          </Grid>
          <Grid item >
            <Chart />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default ChartContainer
