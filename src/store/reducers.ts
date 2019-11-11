import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricReducer } from '../Features/Chart/MetricSelect/reducer';
import { reducer as newMeasurementReducer } from '../subscription/reducer';

export default {
  metrics: metricReducer,
  weather: weatherReducer,
  newMeasurements: newMeasurementReducer,
};
