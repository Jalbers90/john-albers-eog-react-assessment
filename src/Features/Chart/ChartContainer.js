import React, { useEffect } from 'react';
import { Grid, Box, Paper, Typography } from '@material-ui/core';
import { Select, FormControl, InputLabel, MenuItem, Input, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'urql';
import MetricSelector from './MetricSelector';
import MetricTag from './MetricTag';
import Chart from './Chart';
import { useChart } from './chart-context';
import { xMinutesAgo, transformData } from './util';

const styles = makeStyles({
  paper: {
    padding: '16px' // todo: use theme.spacing
  },
  ['griditem-chart']: {
    flexGrow: 1
  }
});

const thirtyMinAgo = xMinutesAgo(30);
const query = `
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        metric
        value
        unit
        at
      }
    }
  }
`;

function ChartContainer(props) {
  const classes = styles();
  const [ { selected }, chartDispatch ] = useChart();
  const [ result ] = useQuery({
    query,
    variables: {
      input: selected.map((metricName) => ({metricName, after: thirtyMinAgo}))
    }
  });
  useEffect(() => {
    const { data, fetching } = result;
    if(!data || fetching) return
    const payload = data.getMultipleMeasurements;
    chartDispatch({type: 'CHANGE_PAST_DATA', payload})
  }, [result, selected])


  return (
    <Box >
      <Paper className={classes.paper} >
        <Grid container  direction='column'>
          <Grid item>
            <Grid container>
              <MetricSelector />
              {selected.map((metric,i) => <MetricTag key={i} name={metric}/>)}
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
