import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export function LineChartInit(chartId) {
  var chart = am4core.create(chartId, am4charts.XYChart);
  chart.paddingRight = 20;
  chart.fontSize = 12;
  var data = [];
  var visits = 10;
  for (var i = 1; i < 50000; i++) {
    visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    data.push({ date: new Date(2018, 0, i), value: visits });
  }

  chart.data = data;

  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.minZoomCount = 5;

  // this makes the data to be grouped
  dateAxis.groupData = true;
  dateAxis.groupCount = 500;

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.id = 'my-id';
  console.log(valueAxis.id);

  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.dateX = "date";
  series.dataFields.valueY = "value";
  series.tooltipText = "{valueY}";
  series.tooltip.pointerOrientation = "vertical";
  series.tooltip.background.fillOpacity = 0.5;
  series.strokeWidth = 1;
  series.name = 'my data'

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.xAxis = dateAxis;
  chart.cursor.behavior = "zoomX";

  // var scrollbarX = new am4core.Scrollbar();
  // scrollbarX.marginBottom = 20;
  // chart.scrollbarX = scrollbarX;
  // chart.scrollbarX.parent = chart.bottomAxesContainer;
  // chart.scrollbarX.startGrip.icon.disabled = true;
  // chart.scrollbarX.endGrip.icon.disabled = true;

  chart.legend = new am4charts.Legend();

  return chart;
}
