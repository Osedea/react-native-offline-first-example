import { combineReducers } from 'redux';

import ImagesReducer from './services/Images/reducer';

export default combineReducers({
    Images: ImagesReducer,
});
