// @flow
import { combineReducers } from 'redux';
import { reducer as network } from 'react-native-offline';

import ImagesReducer from './services/images/reducer';
import UserReducer from './services/user/reducer';

export default combineReducers({
    images: ImagesReducer,
    network,
    user: UserReducer,
});
