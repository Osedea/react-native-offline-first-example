// @flow
import type { User, Action } from 'DoOfflineFirstApps/js/types';

export const SET_USER = 'USER/SET';

export const confirmUser = (user: User): Action => ({
    type: SET_USER,
    payload: user,
});
export const setUser = (user: User): Action => ({
    type: SET_USER,
    payload: {
        ...user,
        // We are adding `saved: false` only as long as we don't
        // get one response of the server
        saved: false,
    },
    meta: {
        offline: {
            effect: {
                url: '/users',
                method: 'POST',
                body: {
                    email: user.uuid,
                    password: user.uuid,
                },
            },
            success: confirmUser,
        },
    },
});
