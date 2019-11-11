import { createSlice, PayloadAction } from 'redux-starter-kit';

export type newMeasurement = {
  at: number;
  metric: string;
  unit: string;
  value: number;
};

export type ApiErrorAction = {
  error: string;
};

const slice = createSlice({
  name: 'newMeasurements',
  initialState: [{}],
  reducers: {
    newMeasurementReceived: (state, action: PayloadAction<newMeasurement>) => {
      return [...state, action.payload]
    },
    newMeasurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
