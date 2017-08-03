// @flow

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

type Action = {
    type: string,
    payload: Object,
    meta: Object,
};

type OfflineAction = {
    type: string,
    payload: string,
    meta: {
        offline: {
            effect: { url: string, method: 'POST' | 'GET' | 'PUT' | 'DELETE' },
            commit: Action,
            rollback: Action
      }
    },
};

const initialState = {
    images: [],
    pendingImages: [],
    failedImages: [],
};

function FavoritesServiceReducer(state = initialState, action: Action | OfflineAction) {
    switch (action.type) {
        case IMAGES_GET:
            return state;
        case IMAGES_GOT:
            return {
                ...state,
                images: [
                    ...state.images,
                    ...action.payload,
                ],
            };
        case IMAGES_GET_FAILED:
            return state;
        case IMAGES_GET_NEW:
            return state;
        case IMAGES_GOT_NEW:
            return state;
        case IMAGES_ADD:
            return state;
        case IMAGES_ADDED:
            return state;
        case IMAGES_ADDITION_FAILED:
            return state;
        default:
            return state;
    }
}

export default FavoritesServiceReducer;
