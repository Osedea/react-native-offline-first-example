// @flow
import type { ImageFromServer, ImageToUpload, User } from 'DoOfflineFirstApps/js/types';
import makeOfflineInterceptable from 'DoOfflineFirstApps/js/services/offlineHelper';
import {
    gotImages,
    getImagesFailed,
    gotNewImages,
    queueImage,
    addedImage,
    addImageFailed,
    toggledLike,
    toggleLikeFailed,
    createCancelActionType,
} from './actions';
import {
    getCatImages,
    getCatImagesSince,
    addCatImage,
    toggleCatImageLike,
} from './requests';

export const getImages = () => makeOfflineInterceptable(
    (dispatch: () => void) => {
        getCatImages()
            .then((data: Array<ImageFromServer>) => {
                dispatch(gotImages(data));
            })
            .catch((error: Error) => {
                dispatch(getImagesFailed(error));
            });
    }
);

export const getImagesSince = (date: string) => makeOfflineInterceptable(
    (dispatch: () => void) => {
        getCatImagesSince(date)
            .then((data: Array<ImageFromServer>) => {
                dispatch(gotNewImages(data));
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
        addCatImage(image: ImageToUpload)
            .then((data: ImageFromServer) => {
                dispatch(addedImage(data));
            })
            .catch((error: Error) => {
                dispatch(addImageFailed(error, image));
            });
    },
    [createCancelActionType(image.uuid)]
);

export const toggleLike = (imageUuid: string, user: User) => makeOfflineInterceptable(
    (dispatch: () => void) => {
        toggleCatImageLike(imageUuid, user)
            .then((data: ImageFromServer) => {
                dispatch(toggledLike(data));
            })
            .catch((error: Error) => {
                dispatch(toggleLikeFailed(error));
            });
    }
);
