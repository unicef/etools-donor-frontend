import { createSlice } from 'redux-starter-kit';

const initialState = [];

const userRolesSlice = createSlice({
    initialState,
    reducers: {
        setUserRoles(state, action) {
            return action.payload;
        }
    }
});

export const { reducer: userRolesReducer } = userRolesSlice;

export const { setUserRoles } = userRolesSlice.actions;
