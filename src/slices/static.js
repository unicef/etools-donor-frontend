import {
  createSlice
} from 'redux-starter-kit';

export const staticAssetsInitialState = {
  grant_issue_years: [],
  approval_year: []
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
