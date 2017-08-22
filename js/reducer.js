// @flow
import { combineReducers } from 'redux';

import ImagesReducer from './services/Images/reducer';
import UserReducer from './services/User/reducer';

export default combineReducers({
    Images: ImagesReducer,
    User: UserReducer,
});
