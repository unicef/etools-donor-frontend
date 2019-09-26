import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'ramda';
import Loader from './Loader';
import { fetchUserRoles } from 'actions/user';
import { selectUserRoles } from 'selectors/user';

export default function Auth({ children }) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const userRoles = useSelector(selectUserRoles);

    useEffect(() => {
        async function getUserRoles() {
            try {
                await dispatch(fetchUserRoles());
                console.log('xxxx');
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        }
        getUserRoles();
    }, []);

    return (
        <>
            <Loader loading={loading} fullscreen />
            {!isEmpty(userRoles) ? children : null}
        </>
    );
}
