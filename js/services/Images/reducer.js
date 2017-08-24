// @flow
import type { Action, ImageFromServer, ImageToUpload } from 'DoOfflineFirstApps/js/types';

import {
    IMAGES_GOT,
    IMAGES_GET_FAILED,
    IMAGES_GOT_NEW,
    IMAGES_ADD,
    IMAGES_ADDED,
    IMAGES_ADDITION_FAILED,
} from './actions';

export type ImagesState = {
    erroredImages: Array<ImageToUpload>,
    images: Array<ImageFromServer>,
    pendingImages: Array<ImageToUpload>,
};
const initialState = {
    erroredImages: [],
    images: [],
    pendingImages: [],
    error: {},
};

function catsServiceReducer(
    state: ImagesState = initialState,
    action: Action
): ImagesState {
    switch (action.type) {
        case IMAGES_GOT:
            return {
                ...state,
                images: [...state.images, ...action.payload],
            };
        case IMAGES_GET_FAILED:
            return {
                ...state,
                error: action.payload,
            };
        case IMAGES_GOT_NEW:
            return {
                ...state,
                images: [...action.payload, ...state.images],
                error: null,
            };
        case IMAGES_ADD:
            return {
                ...state,
                pendingImages: [
                    ...state.pendingImages,
                    action.payload,
                ],
                error: null,
            };
        case IMAGES_ADDED:
            return {
                ...state,
                images: [
                    action.payload,
                    ...state.images,
                ],
                error: null,
            };
        case IMAGES_ADDITION_FAILED:
            return {
                ...state,
                pendingImages: state.pendingImages.filter(
                    (image: ImageToUpload) => image.uuid !== action.meta.image.uuid
                ),
                erroredImages: [...state.erroredImages, action.meta.image],
                error: action.payload,
            };
        default:
            return state;
    }
}

export default catsServiceReducer;
