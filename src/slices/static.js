import {
  createSlice
} from 'redux-starter-kit';

export const staticAssetsInitialState = {
  years: [],
  report_type: [],
  regenerated: [],
  rp_status: [],
  donor_document: [],
  donor_reporting_category: [],
  source_id: {}
};

const staticAssetsSlice = createSlice({
  initialState: staticAssetsInitialState,
  reducers: {
    onReceiveStaticAssets(state, action) {
      return action.payload;
    }
  }
});

export const {
  reducer: staticAssets
} = staticAssetsSlice;
export const {
  onReceiveStaticAssets
} = staticAssetsSlice.actions;
