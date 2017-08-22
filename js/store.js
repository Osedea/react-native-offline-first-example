// @flow
// import { Platform } from 'react-native';
// import devTools from 'remote-redux-devtools';
import { applyMiddleware, createStore, compose } from 'redux';
import { offline } from 'redux-offline';
import defaultConfig from 'redux-offline/lib/defaults';
import Thunk from 'redux-thunk';
import realmPersist from 'redux-persist-realm';

import reducer from './reducer';
import api from './api';

const config = {
    ...defaultConfig,
    effect: (effect, action) => {
        if (__DEV__) {
            console.log('effect', effect, action);
        }

        switch (effect.method) {
            case 'GET':
                return api.get(effect.url);
            case 'POST':
                return api.post(effect.url, effect.body);
            case 'PUT':
                return api.put(effect.url, effect.body);
            default:
                console.log('No method provided to effect.');
        }
    },
    detectNetwork: (callback) => {
        api.get('/')
            .then(() => {
                callback(true);
            })
            .catch(() => {
                callback(false);
            });
    },
    persistOptions: {
        storage: realmPersist,
    },
};
const preloadedState = {};

const store = createStore(
    reducer,
    preloadedState,
    compose(
        applyMiddleware(Thunk),
        // devTools({
        //     name: Platform.OS,
        //     hostname: '127.0.0.1',
        //     port: 8888,
        // }),
        offline(config)
    )
);

export default store;
