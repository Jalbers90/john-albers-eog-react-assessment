import React, { useReducer } from 'react';
import ChartContainer from './ChartContainer';

const ChartContext = React.createContext();

function reducer(state, action) {
  switch(action.type) {
    case 'SELECT_METRIC': {
      return {
        ...state,
        metrics: action.payload
      }
    }
    default:
      return state;
  }
}

const initialState = {
  metrics: [],
  selected: []
};

function ChartProvider(props) {
  const stateHook = useReducer(reducer, initialState);
  return (
    <ChartContext.Provider value={stateHook} {...props} >
      <ChartContainer />
    </ChartContext.Provider>
  )
}

const useChart = () => React.useContext(ChartContext);

export { ChartProvider, useChart };
