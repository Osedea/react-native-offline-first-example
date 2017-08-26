// @flow
import { createSelector } from 'reselect';
import type { ImageToUpload, ImageFromServer } from 'DoOfflineFirstApps/js/types';

import type { ImagesState } from './reducer';

/**
 * Direct selector to the Images state domain
 */
const selectImagesState = () => (state): ImagesState => state.images;

export const selectImages = (): Function =>
    createSelector(
        selectImagesState(),
        (substate: ImagesState): Array<ImageFromServer> => substate.images
    );

export const selectErroredImages = (): Function =>
    createSelector(
        selectImagesState(),
        (substate: ImagesState): Array<ImageToUpload> => substate.erroredImages
    );

/* If you are not using redux-offline, you can handle the pending Images yourself! */
export const selectPendingImages = (): Function => createSelector(
    selectImagesState(),
    (substate): Array<ImageToUpload> => substate.pendingImages
);
