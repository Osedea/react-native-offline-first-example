// @flow

import {
    SET_USER,
    GET_USER_FAILED,
} from './actions';
import { Action, User } from 'DoOfflineFirstApps/js/types';

type UserState = {
    data: User,
    error: ?Error,
};
const initialState = {
    data: {},
    error: null,
};

function usersServiceReducer(state: UserState = initialState, action: Action) {
    switch (action.type) {
        case SET_USER:
            return {
                data: action.payload,
                error: null,
            };
        case GET_USER_FAILED:
            return { error: action.payload };
        default:
            return state;
    }
}

export default usersServiceReducer;
