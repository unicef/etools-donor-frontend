import { getUserRoles } from 'api';
import { setUserRoles } from 'reducers/user';
import { setError } from 'reducers/error';

export const fetchUserRoles = () => async dispatch => {
    try {
        const userRoles = await getUserRoles();
        dispatch(setUserRoles(userRoles));
    } catch (err) {
        dispatch(setError(err.message));
    }
};
