import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChart } from './chart-context';
import { LineChartInit, updateAxes, updateSeries, removeLast, liveUpdate } from './util';

let chart;

const getLastNewMeasurement = ({ newMeasurements }) => {
  const last = newMeasurements.length - 1;
  return newMeasurements[last];
};

function Chart() {
  const [{ selected, pastData }] = useChart();
  const newMeasurement = useSelector(getLastNewMeasurement);
  useEffect(() => {
    // on mount
    chart = LineChartInit('mychart');
    return () => chart.dispose();
  }, []);
  useEffect(() => {
    if (selected.length === 0 && chart.series.length !== 0) {
      removeLast(chart);
      return;
    }
    if (pastData.length === 0) return;
    try { // try catch here due to amchart bug i cannot reproduce on demand
      updateAxes(chart, pastData);
      updateSeries(chart, pastData);
    } catch(e) {
      // do nothing
      console.error(e);
    }
  }, [pastData, selected]);

  useEffect(() => {
    if (!newMeasurement.metric) return;
    if (!selected.includes(newMeasurement.metric)) return;
    liveUpdate(chart, newMeasurement);
  }, [newMeasurement, selected]);

  return <div id="mychart" style={{ minHeight: '600px' }}></div>;
}

export default Chart;
