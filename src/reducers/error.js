import { createSlice } from 'redux-starter-kit';

const errorSlice = createSlice({
    initialState: null,
    reducers: {
        setError(state, action) {
            return action.paylod;
        }
    }
});

export const { reducer: errorReducer } = errorSlice;
export const { setError } = errorSlice.actions;
