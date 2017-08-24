// @flow
import type { NavigationScreenProp } from 'react-navigation/src/TypeDefinition';
import { StyleSheet } from 'react-native';

export type Navigation = NavigationScreenProp;
export type Style = StyleSheet.Styles | Array<StyleSheet.Styles>;

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

type CatImage = {
    uuid: string,
    preview: string,
    uploadedTryAt: string,
};

export type ImageFromServer = CatImage & {
    _id: string,
    likes: number,
    liked: boolean, // Liked by the User
};
export type ImageToUpload = CatImage & {
    processing?: boolean,
    errored?: boolean,
};

export type User = {
    uuid: string,
};
