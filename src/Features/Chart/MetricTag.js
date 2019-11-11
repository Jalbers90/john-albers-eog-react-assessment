import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Typography, CardContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { useChart } from './chart-context';

const useStyles = makeStyles({
  card: {
    minWidth: '100px',
    maxWidth: '200px',
    height: '50px',
    margin: '8px',
    background: 'rgb(226,231,238)',
    boxSizing: 'border-box',
  },
  cardContent: {
    padding: '4px',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: '1px',
    top: '1px',
    fontSize: '12px',
    cursor: 'pointer',
  },
});

const getLastNewMeasurement = ({ newMeasurements }) => {
  const last = newMeasurements.length - 1;
  return newMeasurements[last];
};

function MetricTag({ name }) {
  const classes = useStyles();
  const chartDispatch = useChart()[1];
  const [value, setValue] = useState('...');
  const newMeasurement = useSelector(getLastNewMeasurement);

  useEffect(() => {
    if (newMeasurement.metric === name) {
      const { unit } = newMeasurement;
      setValue(`${newMeasurement.value.toFixed(2)} ${unit}`);
    }
  }, [newMeasurement, name]);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <CloseIcon
          className={classes.icon}
          onClick={() => {
            chartDispatch({ type: 'REMOVE_METRIC', payload: name });
          }}
        />
        <Typography variant="body2">{name}</Typography>
        <Typography variant={'subtitle2'}>{value}</Typography>
      </CardContent>
    </Card>
  );
}

export default MetricTag;
