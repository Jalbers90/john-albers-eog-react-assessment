import React, { useReducer } from 'react';
import ChartContainer from './ChartContainer';

const ChartContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_PAST_DATA': {
      return {
        ...state,
        pastData: action.payload,
      };
    }
    case 'SELECT_METRIC': {
      return {
        ...state,
        selected: action.payload,
      };
    }
    case 'REMOVE_METRIC': {
      return {
        ...state,
        selected: state.selected.filter(metric => metric !== action.payload),
      };
    }
    default:
      return state;
  }
}

const initialState = {
  selected: [],
  pastData: [],
};

function ChartProvider(props) {
  const stateHook = useReducer(reducer, initialState);
  return (
    <ChartContext.Provider value={stateHook} {...props}>
      <ChartContainer />
    </ChartContext.Provider>
  );
}

const useChart = () => React.useContext(ChartContext);

export { ChartProvider, useChart };
