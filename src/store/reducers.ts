import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricReducer } from '../Features/Chart/reducer';

export default {
  metrics: metricReducer,
  weather: weatherReducer,
};
