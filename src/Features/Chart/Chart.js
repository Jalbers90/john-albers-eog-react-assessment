import React, { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import { useQuery } from 'urql';
import { useChart } from './chart-context';
import {
  LineChartInit,
  xMinutesAgo,
  updateAxes,
  updateSeries,
  removeLast,
  liveUpdate
} from './util';

let chart;

const getLastNewMeasurement = ({newMeasurements}) => {
  const last = newMeasurements.length - 1;
  return newMeasurements[last];
}

function Chart() {
  const [ {selected, pastData} ] = useChart();
  const newMeasurement = useSelector(getLastNewMeasurement);
  useEffect(() => { // on mount
    chart = LineChartInit('mychart');
    return () => chart.dispose();
  }, []);
  useEffect(() => {
    if(selected.length === 0 && chart.series.length !== 0){
      removeLast(chart);
      return
    }
    if (pastData.length === 0) return
    updateAxes(chart, pastData);
    updateSeries(chart, pastData);
  }, [pastData, selected])

  useEffect(() => {
    if(!newMeasurement.metric) return
    if(!selected.includes(newMeasurement.metric)) return
    liveUpdate(chart, newMeasurement);
  }, [newMeasurement])

  return (
      <div id='mychart' style={{minHeight: '600px'}}></div>
  )
}

export default Chart
