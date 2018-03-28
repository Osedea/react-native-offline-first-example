// @flow
import type { ImageFromServer, ImageToUpload, User } from 'DoOfflineFirstApps/js/types';
import makeOfflineInterceptable from 'DoOfflineFirstApps/js/services/offlineHelper';
import {
    gotImages,
    getImagesFailed,
    gotNewImages,
    queueImage,
    retryImage,
    addedImage,
    addImageFailed,
    toggledLike,
    toggleLikeFailed,
    createCancelActionType,
} from './actions';
import {
    getCatImages,
    getCatImagesSince,
    getMoreCatImages,
    addCatImage,
    toggleCatImageLike,
} from './requests';
import { selectImages } from './selectors';

export const getImages = () => makeOfflineInterceptable(
    (dispatch: () => void) => {
        getCatImages()
            .then(({ data }: { data: Array<ImageFromServer> }) => {
                dispatch(gotImages(data));
            })
            .catch((error: Error) => {
                dispatch(getImagesFailed(error));
            });
    }
);

export const getNewImages = () => makeOfflineInterceptable(
    (dispatch: () => void, getState: Function) => {
        const imagesCreated = selectImages()(getState()).filter(
            (image: ImageFromServer) => image.uploadedTryAt
        );
        if (imagesCreated.length && imagesCreated[0] && imagesCreated[0].uploadedTryAt) {
            getCatImagesSince(imagesCreated[0].uploadedTryAt)
                .then(({ data }: { data: Array<ImageFromServer> }) => {
                    dispatch(gotNewImages(data));
                })
                .catch((error: Error) => {
                    dispatch(getImagesFailed(error));
                });
        }
    }
);

export const getMoreImages = () => makeOfflineInterceptable(
    (dispatch: () => void, getState: Function) => {
        getMoreCatImages(selectImages()(getState()).length)
            .then(({ data }: { data: Array<ImageFromServer> }) => {
                dispatch(gotImages(data));
            })
            .catch((error: Error) => {
                dispatch(getImagesFailed(error));
            });
    }
);

export const addLocalImage = (image: ImageToUpload) => (dispatch) => {
    // Enqueue as pending so we can visualize and eventually cancel them offline
    dispatch(queueImage(image));
};

export const sendImage = (image: ImageToUpload) => makeOfflineInterceptable(
    (dispatch: () => void) => {
        const { processing, ...upload } = image;

        addCatImage(upload: ImageToUpload)
            .then(({ data }: { data: ImageFromServer }) => {
                dispatch(addedImage(data));
            })
            .catch((error: Error) => {
                if (__DEV__) {
                    console.log(error);
                }
                dispatch(addImageFailed(error, image));
            });
    },
    [createCancelActionType(image.uuid)]
);

export const retryImages = (images: [ImageToUpload]) => (dispatch: () => void) => {
    images.forEach((image: ImageToUpload) => {
        dispatch(retryImage(image));
        dispatch(sendImage(image));
    });
};

export const toggleLike = (imageUuid: string, user: User) => makeOfflineInterceptable(
    (dispatch: () => void) => {
        toggleCatImageLike(imageUuid, user)
            .then(({ data }: { data: ImageFromServer }) => {
                dispatch(toggledLike(data));
            })
            .catch((error: Error) => {
                dispatch(toggleLikeFailed(error));
            });
    }
);
