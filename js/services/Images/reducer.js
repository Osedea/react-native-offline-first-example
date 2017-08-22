// @flow

import type { Action, CatImage } from 'DoOfflineFirstApps/js/types';

import {
    IMAGES_GET,
    IMAGES_GOT,
    IMAGES_GET_FAILED,
    IMAGES_GET_NEW,
    IMAGES_GOT_NEW,
    IMAGES_ADD,
    IMAGES_ADDED,
    IMAGES_ADDITION_FAILED,
} from './actions';

export type ImagesState = {
    images: Array<CatImage>,
    // pendingImages: Array<CatImage>,
    failedImages: Array<CatImage>,
};
const initialState = {
    images: [],
    // pendingImages: [],
    failedImages: [],
};

function CatsServiceReducer(
    state: ImagesState = initialState,
    action: Action
): ImagesState {
    let newState = { ...state };

    switch (action.type) {
        case IMAGES_GET:
            newState = state;
            break;
        case IMAGES_GOT:
            newState = {
                ...state,
                images: [...state.images, ...action.payload],
            };
            break;
        case IMAGES_GET_FAILED:
            newState = state;
            break;
        case IMAGES_GET_NEW:
            newState = state;
            break;
        case IMAGES_GOT_NEW:
            newState = state;
            break;
        case IMAGES_ADD:
            newState = {
                ...state,
                /* If you are not using redux-offline, handle the pending Images yourself! */
                // pendingImages: [
                //     ...state.pendingImages,
                //     ...action.payload,
                // ],
                images: [
                    // Optimistic UI, we add the images to the list of displayed images
                    ...action.payload,
                    ...state.images,
                ],
            };
            break;
        case IMAGES_ADDED:
            newState = {
                ...state,
                images: [
                    ...action.payload,
                    ...state.images.filter(
                        (stateImage) =>
                            !(
                                stateImage.processing &&
                                action.payload.find(
                                    (addedImage) =>
                                        addedImage.data === stateImage.data &&
                                        addedImage.timestamp ===
                                            stateImage.timestamp
                                )
                            )
                    ),
                ],
            };
            break;
        case IMAGES_ADDITION_FAILED:
            newState = {
                ...state,
                images: [
                    ...state.images.filter(
                        (stateImage) =>
                            !(
                                stateImage.processing &&
                                action.payload.find(
                                    (addedImage) =>
                                        addedImage.data === stateImage.data &&
                                        addedImage.timestamp ===
                                            stateImage.timestamp
                                )
                            )
                    ),
                ],
                failedImages: [...state.failedImages, ...action.payload],
            };
            break;
        default:
            newState = state;
    }

    if (__DEV__) {
        // Because redux-devtools do not work with redux-offline...
        // Old school logging
        console.log('==============');
        console.log('OLD STATE', { ...state });
        console.log({ ...action });
        console.log('NEW STATE', { ...state });
    }

    return newState;
}

export default CatsServiceReducer;
