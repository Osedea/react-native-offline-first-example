// @flow
import type { NavigationScreenProp } from 'react-navigation/src/TypeDefinition';
import { StyleSheet } from 'react-native';
import type { OfflineState as OfflineReduxOfflineState, OfflineMetadata } from 'redux-offline/src/types';

export type Navigation = NavigationScreenProp;
export type Style = StyleSheet.Styles | Array<StyleSheet.Styles>;
export type OfflineState = OfflineReduxOfflineState;

type NormalAction = {
    type: string,
    payload: Object,
    meta: Object,
};

type OfflineAction = {
    type: string,
    payload: string,
    meta: {
        offline: OfflineMetadata,
    },
};

export type Action = NormalAction | OfflineAction;

export type CatImage = {
    uri: string,
    preview: string,
    timestamp: string,
};

export type ImageToUpload = CatImage & { processing: boolean };
export type ImagesToUpload = Array<ImageToUpload>;

export type User = {
    uuid: string,
};
