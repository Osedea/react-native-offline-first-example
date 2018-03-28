// @flow
import type { User, Action } from 'DoOfflineFirstApps/js/types';

export const SET_USER = 'USER/SET';
export const GET_USER_FAILED = 'USER/GET_FAILED';

export const setLocalUser = (user: User): Action => ({
    type: SET_USER,
    payload: {
        ...user,
        // We are adding `processing: true` only as long as we don't
        // get one response of the server
        processing: true,
    },
});
export const setUser = (user: User): Action => ({
    type: SET_USER,
    payload: user,
});
export const setUserError = (error: Error): Action => ({
    type: GET_USER_FAILED,
    payload: error,
});
