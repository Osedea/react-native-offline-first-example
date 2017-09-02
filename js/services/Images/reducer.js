// @flow
import type { Action, ImageFromServer, ImageToUpload } from 'DoOfflineFirstApps/js/types';

import {
    IMAGES_GOT,
    IMAGES_GET_FAILED,
    IMAGES_GOT_NEW,
    IMAGE_ADD,
    IMAGE_ADD_SUCCESS,
    IMAGE_ADD_FAILURE,
    IMAGE_RETRY,
    IMAGE_REPORT,
    IMAGE_REMOVE,
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
        case IMAGE_ADD:
            return {
                ...state,
                pendingImages: [
                    ...state.pendingImages,
                    action.payload,
                ],
                error: null,
            };
        case IMAGE_ADD_SUCCESS:
            return {
                ...state,
                images: [
                    action.payload,
                    ...state.images,
                ],
                pendingImages: [
                    ...state.pendingImages.filter(
                        (image: ImageToUpload) => image.uuid !== action.payload.uuid
                    ),
                ],
                error: null,
            };
        case IMAGE_ADD_FAILURE:
            return {
                ...state,
                pendingImages: [
                    ...state.pendingImages.filter(
                        (image: ImageToUpload) => image.uuid !== action.meta.image.uuid
                    ),
                ],
                erroredImages: [...state.erroredImages, action.meta.image],
                error: action.payload,
            };
        case IMAGE_REPORT:
            return {
                ...state,
                images: state.images.map(
                    (image: ImageFromServer) => {
                        if (image.uuid === action.payload) {
                            return {
                                ...image,
                                reported: true,
                            };
                        }

                        return image;
                    }
                ),
            };
        case IMAGE_REMOVE:
            return {
                ...state,
                images: [
                    ...state.images.filter(
                        (image: ImageFromServer) => image.uuid !== action.payload
                    ),
                ],
            };
        case IMAGE_RETRY:
            return {
                ...state,
                pendingImages: [...state.pendingImages, action.payload],
                erroredImages: [
                    ...state.erroredImages.filter(
                        (image: ImageToUpload) => image.uuid !== action.payload.uuid
                    ),
                ],
                error: action.payload,
            };
        default:
            return state;
    }
}

export default catsServiceReducer;
