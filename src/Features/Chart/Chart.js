import React, { useEffect, useReducer } from 'react';
import { Typography, Box } from '@material-ui/core';
import { useQuery } from 'urql';
import { useChart } from './chart-context';
import { LineChartInit, xMinutesAgo, updateAxes, updateSeries, removeLast } from './util';

let chart;

function Chart() {
  const [ {selected, pastData} ] = useChart();
  useEffect(() => { // on mount
    chart = LineChartInit('mychart');
    console.log(chart);

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

  return (
      <div id='mychart' style={{minHeight: '600px'}}></div>
  )
}

export default Chart
