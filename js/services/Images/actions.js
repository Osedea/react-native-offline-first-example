// @flow
import type { Action, CatImage, ImagesToUpload, User } from 'DoOfflineFirstApps/js/types';

export const IMAGES_GET = 'IMAGES/GET';
export const IMAGES_GOT = 'IMAGES/GOT';
export const IMAGES_GET_FAILED = 'IMAGES/GET_FAILED';

export const gotImages = (data: Array<CatImage>): Action => ({
    type: IMAGES_GOT,
    payload: data,
});
export const getImagesFailed = (error: Error): Action => ({
    type: IMAGES_GET_FAILED,
    payload: error,
});
export const getImages = () => ({
    type: IMAGES_GET,
    meta: {
        offline: {
            effect: {
                url: '/cats',
                method: 'GET',
            },
            commit: gotImages,
            rollback: getImagesFailed,
        },
    },
});

export const IMAGES_GET_NEW = 'IMAGES/GET_NEW';
export const IMAGES_GOT_NEW = 'IMAGES/GOT_NEW';

export const gotNewImages = (data: Array<CatImage>): Action => ({
    type: IMAGES_GOT_NEW,
    payload: data,
});
export const getNewImages = (date: Date): Action => ({
    type: IMAGES_GET_NEW,
    meta: {
        offline: {
            effect: {
                url: `/cats?since=${date}`,
                method: 'GET',
            },
            commit: gotNewImages,
            rollback: getImagesFailed,
        },
    },
});

export const IMAGES_ADD = 'IMAGES/IMAGES_ADD';
export const IMAGES_ADDED = 'IMAGES/IMAGES_ADDED';
export const IMAGES_ADDITION_FAILED = 'IMAGES/IMAGES_ADDITION_FAILED';

export const addedImages = (data: Array<CatImage>): Action => ({
    type: IMAGES_ADDED,
    payload: data,
});
export const addImagesFailed = (error: Error): Action => ({
    type: IMAGES_ADDITION_FAILED,
    payload: error,
});
export const addImages = (data: ImagesToUpload): Action => ({
    type: IMAGES_ADD,
    payload: data,
    meta: {
        offline: {
            effect: {
                url: `/cats`,
                method: 'POST',
            },
            commit: addedImages,
            rollback: addImagesFailed,
        },
    },
});

export const TOGGLE_LIKE = 'IMAGES/TOGGLE_LIKE';

export const addedImage = (data: Array<CatImage>): Action => ({
    type: IMAGES_ADDED,
    payload: [data],
});
export const toggleLike = (image: CatImage, user: User): Action => ({
    type: TOGGLE_LIKE,
    payload: image,
    meta: {
        offline: {
            effect: {
                url: `/cats/${image.uuid}/likes`,
                method: 'POST',
                body: {
                    user: user.uuid,
                },
            },
            commit: addedImage,
            // rollback: Let's ignore the rollback. We'll loose one like. Too bad
        },
    },
});
