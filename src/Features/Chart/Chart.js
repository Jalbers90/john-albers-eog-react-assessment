import React, { useEffect } from 'react';
import { Typography, Box } from '@material-ui/core';

import { LineChartInit } from './util';

let chart;

function Chart(props) {
  useEffect(() => {
    chart = LineChartInit('mychart');
    return () => chart.dispose();
  }, [])
  return (
    <Box>
      <div id='mychart' style={{minHeight: '600px'}}></div>
    </Box>
  )
}

export default Chart
