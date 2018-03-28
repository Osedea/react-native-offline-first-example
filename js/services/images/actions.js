// @flow
import type { Action, ImageFromServer } from 'DoOfflineFirstApps/js/types';

export const IMAGES_GOT = 'IMAGES/GOT';
export const IMAGES_GET_FAILED = 'IMAGES/GET_FAILED';

export const gotImages = (data: Array<ImageFromServer>): Action => ({
    type: IMAGES_GOT,
    payload: data,
});
export const getImagesFailed = (error: Error): Action => ({
    type: IMAGES_GET_FAILED,
    payload: error,
});

export const IMAGES_GOT_NEW = 'IMAGES/GOT_NEW';

export const gotNewImages = (data: Array<ImageFromServer>): Action => ({
    type: IMAGES_GOT_NEW,
    payload: data,
});

export const IMAGE_ADD = 'IMAGES/IMAGE_ADD';
export const IMAGE_ADD_SUCCESS = 'IMAGES/IMAGE_ADD_SUCCESS';
export const IMAGE_ADD_FAILURE = 'IMAGES/IMAGE_ADD_FAILURE';
export const IMAGE_RETRY = 'IMAGES/IMAGE_RETRY';
export const createCancelActionType = (uuid: string) => `IMAGES/CANCEL_ADD/${uuid}`;

export const retryImage = (data: ImageToUpload): Action => ({
    type: IMAGE_RETRY,
    payload: data,
});
export const queueImage = (data: ImageToUpload): Action => ({
    type: IMAGE_ADD,
    payload: data,
});
export const addedImage = (data: ImageFromServer): Action => ({
    type: IMAGE_ADD_SUCCESS,
    payload: data,
});
export const addImageFailed = (error: Error, image: ImageToUpload): Action => ({
    type: IMAGE_ADD_FAILURE,
    payload: error,
    meta: {
        image,
    },
});

export const TOGGLED_LIKE = 'IMAGES/TOGGLED_LIKE';
export const TOGGLE_LIKE_FAILED = 'IMAGES/TOGGLE_LIKE_FAILED';

export const toggledLike = (image: ImageFromServer): Action => ({
    type: TOGGLED_LIKE,
    payload: image,
});
export const toggleLikeFailed = (error: Error): Action => ({
    type: TOGGLE_LIKE_FAILED,
    payload: error,
});

export const IMAGE_REPORT = 'IMAGES/IMAGE_REPORT';
export const reportImage = (uuid: string): Action => ({
    type: IMAGE_REPORT,
    payload: uuid,
});

export const IMAGE_REMOVE = 'IMAGES/IMAGE_REMOVE';
export const removeImage = (uuid: string): Action => ({
    type: IMAGE_REMOVE,
    payload: uuid,
});
