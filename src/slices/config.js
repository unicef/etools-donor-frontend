import {
  createSlice
} from 'redux-starter-kit';

export const configInitialState = {
  tracker: {},
  source_id: {}
};

const configSlice = createSlice({
  initialState: configInitialState,
  reducers: {
    onReceiveConfig(state, action) {
      return action.payload;
    }
  }
});

export const {
  reducer: config
} = configSlice;
export const {
  onReceiveConfig
} = configSlice.actions;
