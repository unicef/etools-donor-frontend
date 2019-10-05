import { createSlice } from 'redux-starter-kit';

const themesSlice = createSlice({
    initialState: [],
    reducers: {
        onReceivethemes(state, action) {
            return action.payload;
        }
    }
});

const { reducer: themes } = themesSlice;
export const { onReceivethemes } = themesSlice.actions;

const grantsSlice = createSlice({
    initialState: [],
    reducers: {
        onReceiveGrants(state, action) {
            return action.payload;
        }
    }
});

const { reducer: grants } = grantsSlice;
export const { onReceiveGrants } = grantsSlice.actions;

const externalGrantsSlice = createSlice({
    initialState: [],
    reducers: {
        onReceiveExternalGrants(state, action) {
            return action.payload;
        }
    }
});

const { reducer: externalGrants } = externalGrantsSlice;
export const { onReceiveExternalGrants } = externalGrantsSlice.actions;

export const collectionsReducers = {
    themes,
    grants,
    externalGrants
};
