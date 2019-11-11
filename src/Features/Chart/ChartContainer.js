import React, { useEffect } from 'react';
import { Grid, Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'urql';
import MetricSelector from './MetricSelect/MetricSelector';
import MetricTag from './MetricTag';
import Chart from './Chart';
import { useChart } from './chart-context';
import { xMinutesAgo } from './util';

const styles = makeStyles({
  paper: {
    padding: '16px', // todo: use theme.spacing
  },
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
  const [{ selected }, chartDispatch] = useChart();
  const [result] = useQuery({
    query,
    variables: {
      input: selected.map(metricName => ({ metricName, after: thirtyMinAgo })),
    },
  });
  const { data, fetching, error } = result;

  useEffect(() => {
    if (!data || fetching) return;
    const payload = data.getMultipleMeasurements;
    chartDispatch({ type: 'CHANGE_PAST_DATA', payload });
  }, [data, fetching, selected, chartDispatch]);

  return (
    <Box>
      <Paper className={classes.paper}>
        <Grid container direction="column">
          <Grid item>
            <Grid container>
              <MetricSelector />
              {selected.map((metric, i) => (
                <MetricTag key={i} name={metric} />
              ))}
            </Grid>
          </Grid>
          <Grid item>
            {error && <Typography>{`${error.message}\nPlease refresh`}</Typography>}
            <Chart />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default ChartContainer;
