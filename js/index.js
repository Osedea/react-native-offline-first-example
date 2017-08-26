/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator as stack } from 'react-navigation';
import { Provider } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { withNetworkConnectivity } from 'react-native-offline';

import type { ImageToUpload } from 'DoOfflineFirstApps/js/types';
import { selectPendingImages } from 'DoOfflineFirstApps/js/services/images/selectors';
import { setLocalUser } from 'DoOfflineFirstApps/js/services/user/actions';
import getAndSetUser from 'DoOfflineFirstApps/js/services/user/thunks';
import { retryImages } from 'DoOfflineFirstApps/js/services/images/thunks';
import colors from 'DoOfflineFirstApps/js/colors';

import { API_URL } from './api';
import store from './store';
import HomeScreen from './routes/home';
import ImageDetailScreen from './routes/imageDetail';
import ImageAddScreen from './routes/imageAdd';

const Navigator = stack({
    Home: { screen: HomeScreen },
    ImageAdd: { screen: ImageAddScreen },
    ImageDetail: { screen: ImageDetailScreen },
}, {
    cardStyle: {
        backgroundColor: colors.background,
    },
    navigationOptions: {
        headerStyle: {
            backgroundColor: colors.darkOrange,
            borderBottomWidth: 2,
            borderBottomColor: colors.orange,
        },
        headerTitleStyle: {
            color: colors.white,
        },
        headerBackTitleStyle: {
            color: colors.white,
        },
        headerTintColor: colors.white,
    },
});

const App = withNetworkConnectivity({
    withRedux: true,
    pingServerUrl: API_URL,
    checkConnectionInterval: 3000,
})(Navigator);

export default class DoOfflineFirstApps extends Component {
    componentWillMount() {
        const user = { uuid: DeviceInfo.getUniqueID() };

        if (!store.getState().user.data) {
            store.dispatch(setLocalUser(user));
        }

        store.dispatch(getAndSetUser(user));
        // Retry Images if some are pending
        store.dispatch(retryImages(selectPendingImages()(store.getState())));
    }

    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}
