import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

export const xMinutesAgo = minutes => {
  return new Date().getTime() - minutes * 60 * 1000;
};

export const updateSeries = (chart, data) => { // adds or removes line from chart as needed
  if (chart.series.length === 0) {
    const newLine = chart.series.push(new am4charts.LineSeries());
    const unit = data[0].measurements[0].unit;
    const name = data[0].metric;
    newLine.id = name;
    newLine.name = name;

    newLine.dataFields.valueY = 'value';
    newLine.dataFields.dateX = 'at';
    newLine.tooltipText = '{name}: [bold]{valueY}[/]';
    newLine.yAxis = chart.yAxes.values.find(yAxis => yAxis.id === unit);
    newLine.data = data[0].measurements;
  }

  const oldSeries = chart.series.values.map(series => series.id);
  const newSeries = data.map(metric => metric.metric);

  if (oldSeries.sort().join(',') === newSeries.sort().join(',')) return;

  oldSeries.forEach(old => {
    if (!newSeries.includes(old)) {
      const index = chart.series.values.findIndex(series => series.id === old);
      chart.series.removeIndex(index);
    }
  });

  newSeries.forEach(newS => {
    if (!oldSeries.includes(newS)) {
      const newLine = chart.series.push(new am4charts.LineSeries());
      const metric = data.find(m => m.metric === newS);
      const unit = metric.measurements[0].unit;
      const name = metric.metric;
      newLine.id = name;
      newLine.name = name;
      newLine.dataFields.valueY = 'value';
      newLine.dataFields.dateX = 'at';
      newLine.tooltipText = '{name}: [bold]{valueY}[/]';
      newLine.yAxis = chart.yAxes.values.find(yAxis => yAxis.id === unit);
      newLine.data = metric.measurements;
    }
  });
};

export const updateAxes = (chart, data) => { // adds or removes yAxis from chart as needed
  if (chart.yAxes.length === 0) {
    const name = data[0].measurements[0].unit;
    const newAxis = chart.yAxes.push(new am4charts.ValueAxis());
    newAxis.title.text = name;
    newAxis.id = name;
    return;
  }
  const oldAxes = chart.yAxes.values.map(yaxis => yaxis.id);
  const newAxes = [...new Set(data.map(metric => metric.measurements[0].unit))];

  if (oldAxes.sort().join(',') === newAxes.sort().join(',')) return;

  oldAxes.forEach(old => {
    //remove unused axis'
    if (!newAxes.includes(old)) {
      const index = chart.yAxes.values.findIndex(axis => axis.id === old);
      chart.yAxes.removeIndex(index);
    }
  });

  newAxes.forEach(newA => {
    // add new axis'
    if (!oldAxes.includes(newA)) {
      const newAxis = chart.yAxes.push(new am4charts.ValueAxis());
      newAxis.title.text = newA;
      newAxis.id = newA;
    }
  });
};

export const removeLast = chart => { //removes final line/axis when no metrics are selected
  chart.yAxes.removeIndex(0);
  chart.series.removeIndex(0);
};

export const liveUpdate = (chart, measurement) => { // adds latest data point to chart
  const { metric } = measurement;
  const series = chart.series.values.find(s => {
    return s.id === metric;
  });
  if (series) {
    series.addData(measurement);
  }
};

export function LineChartInit(chartId) { // initial chart load
  am4core.options.minPolylineStep = 5;
  var chart = am4core.create(chartId, am4charts.XYChart);
  chart.paddingRight = 20;
  chart.fontSize = 12;

  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.minZoomCount = 5;
  dateAxis.baseInterval = { timeUnit: 'second', count: 1 };

  // this makes the data to be grouped
  // dateAxis.groupData = true;
  // dateAxis.groupCount = 500;

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.xAxis = dateAxis;
  chart.cursor.behavior = 'zoomX';

  var scrollbarX = new am4core.Scrollbar();
  scrollbarX.marginBottom = 20;
  chart.scrollbarX = scrollbarX;
  chart.scrollbarX.parent = chart.bottomAxesContainer;
  chart.scrollbarX.startGrip.icon.disabled = true;
  chart.scrollbarX.endGrip.icon.disabled = true;

  chart.legend = new am4charts.Legend();

  return chart;
}
