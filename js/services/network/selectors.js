// @flow
import { createSelector } from 'reselect';

/**
 * Direct selector to the network state domain
 */
const selectNetworkState = () => (state) => state.network;

export const isConnected = (): Function =>
    createSelector(
        selectNetworkState(),
        (substate): boolean => substate.isConnected
    );

export const selectActionQueue = (): Function =>
    createSelector(
        selectNetworkState(),
        (substate): Array<*> => substate.actionQueue
    );
