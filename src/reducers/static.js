import { createSlice } from 'redux-starter-kit';

const staticSlice = createSlice({
  initialState: {
    years: [],
    report_type: [],
    reporting_group: [],
    regenerated: [],
    rp_status: [],
    donor_document: [],
    donor_reporting_category: []
  },
  reducers: {
    onReceiveStaticAssets(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: staticAssets } = staticSlice;
export const { onReceiveStaticAssets } = staticSlice.actions;
