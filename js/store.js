import { Platform } from 'react-native';
import { applyMiddleware, createStore, compose } from 'redux';
import { offline } from 'redux-offline';
import Thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';

// import offlineConfig from 'redux-offline/lib/defaults';
import reducer from './reducer';
import api from './api';

const config = {
    effect: (effect, action) => {
        switch (effect.method) {
            case 'GET':
                return api.get(effect.url);
            case 'POST':
                return api.post(effect.url, action.payload);
            case 'PUT':
                return api.put(effect.url, action.payload);
        }
    }
};
const preloadedState = {};

const store = createStore(
    reducer,
    preloadedState,
    compose(
        applyMiddleware(Thunk),
        offline(config),
        devTools({
            name: Platform.OS,
            hostname: '127.0.0.1',
            port: 8888,
        })
    )
);

export default store;
