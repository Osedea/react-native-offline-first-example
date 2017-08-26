// @flow
import type { User } from 'DoOfflineFirstApps/js/types';
import makeOfflineInterceptable from 'DoOfflineFirstApps/js/services/offlineHelper';
import {
    SET_USER,
    setUser,
    setUserError,
} from './actions';
import {
    createUser,
    getUser,
} from './requests';

const getAndSetUser = (user: User) => makeOfflineInterceptable(
    (dispatch: () => void) => {
        getUser(user)
            .then(({ data }: { data: User }) => {
                dispatch(setUser(data));
            })
            .catch((error: Error) => {
                if (error.status === 404) {
                    createUser(user)
                        .then(({ data }: { data: User }) => {
                            dispatch(setUser(data));
                        })
                        .catch((createError: Error) => {
                            dispatch(setUserError(createError));
                        });
                } else {
                    dispatch(setUserError(error));
                }
            });
    },
    [SET_USER] // Reset queued SET_USER actions if we dispatch another one
);

export default getAndSetUser;
