// @flow
import { createSelector } from 'reselect';
import type { CatImage, Action, OfflineState } from 'DoOfflineFirstApps/js/types';

import type { ImagesState } from './reducer';

/**
 * Direct selector to the Images state domain
 */
const selectImagesState = () => (state): ImagesState => state.Images;

export const selectImages = (): Function =>
    createSelector(
        selectImagesState(),
        (substate: ImagesState): Array<CatImage> => substate.images
    );

export const selectErroredImages = (): Function =>
    createSelector(
        selectImagesState(),
        (substate: ImagesState): Array<CatImage> => substate.failedImages
    );

export const selectOfflineState = (): Function => (state): OfflineState => state.offline;

export const selectPendingImages = (): Function => createSelector(
    selectOfflineState(),
    (substate: OfflineState): Array<CatImage> => substate.outbox
        .filter((item: Action) => item.type.indexOf('IMAGES/IMAGES_ADD') === 0)
        .reduce((result: Array<CatImage>, action: Action) => result.concat(
            action.payload.map((item) => {
                item.originalAction = action;

                return item;
            })
        ), [])
);

/* If you are not using redux-offline, you can handle the pending Images yourself! */
// export const selectPendingImages = (): Function => createSelector(
//     selectSectionsState(),
//     (substate): Array<CatImage> => substate.pendingImages
// );
