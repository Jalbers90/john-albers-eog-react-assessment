import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';
import { Select, FormControl, InputLabel, MenuItem, Input, Checkbox, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useChart } from '../chart-context';
import { actions } from './reducer';

const styles = makeStyles({
  formControl: {
    width: 120,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// my stuff
const query = `query {getMetrics}`;

function MetricSelector(props) {
  const classes = styles();
  const dispatch = useDispatch();
  const metrics = useSelector(state => state.metrics);
  const [{ selected }, chartDispatch] = useChart();
  const handleChange = e => {
    chartDispatch({ type: 'SELECT_METRIC', payload: e.target.value });
  };
  const { fetching, data, error } = useQuery({ query })[0];

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(actions.metricsReceived(getMetrics));
  }, [dispatch, data, error]);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Metrics</InputLabel>
      <Select
        id="demo-mutiple-checkbox"
        multiple
        value={selected}
        onChange={handleChange}
        input={<Input />}
        renderValue={selected => ' ... '}
        MenuProps={MenuProps}
      >
        {fetching && <MenuItem>Loading Options</MenuItem>}
        {metrics &&
          metrics.map(metric => (
            <MenuItem key={metric} value={metric}>
              <Checkbox checked={selected.indexOf(metric) > -1} />
              <ListItemText primary={metric} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default MetricSelector;
