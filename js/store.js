// @flow
import { Platform } from 'react-native';
import { composeWithDevTools } from 'remote-redux-devtools';
import { applyMiddleware, createStore } from 'redux';
import Thunk from 'redux-thunk';
import { createNetworkMiddleware } from 'react-native-offline';
import { persistStore, autoRehydrate } from 'redux-persist';
import realmPersist from 'redux-persist-realm';

import reducer from './reducer';

const preloadedState = {};
const networkMiddleware = createNetworkMiddleware();
const composeEnhancers = composeWithDevTools({
    name: Platform.OS,
    hostname: '127.0.0.1',
    port: 8888,
    realtime: true,
});

const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(
        applyMiddleware(...[
            networkMiddleware,
            Thunk,
        ]),
        autoRehydrate()
    )
);

export const persistor = persistStore(
    store,
    {
        storage: realmPersist,
        blacklist: ['network'],
        // You can either blacklist some keys or use `whitelist` to save only the keys you need
    }
);

// If your storage is messed up, just purge it
// persistor.purge();

export default store;
