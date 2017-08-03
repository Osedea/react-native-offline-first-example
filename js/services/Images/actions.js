export const IMAGES_GET = 'IMAGES/GET';
export const IMAGES_GOT = 'IMAGES/GOT';
export const IMAGES_GET_FAILED = 'IMAGES/GET_FAILED';

export const gotImages = (data) => ({
    type: IMAGES_GOT,
    payload: data,
});
export const getImagesFailed = (error) => ({
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

export const gotNewImages = (data) => ({
    type: IMAGES_GOT_NEW,
    payload: data,
});
export const getNewImages = (date) => ({
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

type ImagesToUpload = [
    { uri: string },
];

export const addedImages = (data) => ({
    type: IMAGES_ADDED,
    payload: data,
});
export const addImagesFailed = (error) => ({
    type: IMAGES_ADDITION_FAILED,
    payload: error,
});
export const addImages = (data: ImagesToUpload) => ({
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
