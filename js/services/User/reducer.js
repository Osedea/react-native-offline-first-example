// @flow

import { SET_USER } from './actions';
import { Action } from 'DoOfflineFirstApps/js/types';

const initialState = {
    user: {},
};

function UsersServiceReducer(state = initialState, action: Action) {
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
