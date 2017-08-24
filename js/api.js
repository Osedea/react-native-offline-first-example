// @flow

import { create } from 'apisauce';
import { withNetworkConnectivity } from 'react-native-offline';

export const API_URL = 'http://localhost:3030';
export const withCheckInternet = withNetworkConnectivity({
    pingServerUrl: API_URL,
});

const api = create({
    baseURL: API_URL,
});

api.addResponseTransform((response) => {
    if (response.status >= 400) {
        const error = new Error(response.status);

        error.response = response;

        throw error;
    }

    return response;
});

export default api;
