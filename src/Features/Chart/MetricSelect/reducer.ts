import { createSlice, PayloadAction } from 'redux-starter-kit';

export type metrics = [];

export type ApiErrorAction = {
  error: string;
};

const slice = createSlice({
  name: 'metrics',
  initialState: [],
  reducers: {
    metricsReceived: (state, action: PayloadAction<metrics>) => action.payload,
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
