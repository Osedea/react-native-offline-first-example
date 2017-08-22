// @flow

import { SET_USER } from './actions';
import { Action, User } from 'DoOfflineFirstApps/js/types';

type UserState = {
    user: User,
};
const initialState = {
    user: {},
};

function UsersServiceReducer(state: UserState = initialState, action: Action) {
    switch (action.type) {
        case SET_USER:
            return {
                state,
                user: action.payload,
            };
        default:
            return state;
    }
}

export default UsersServiceReducer;
