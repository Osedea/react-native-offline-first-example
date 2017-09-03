// @flow
import type { ImageToUpload } from 'DoOfflineFirstApps/js/types';
import api from 'DoOfflineFirstApps/js/api';

export const getCatImages = () => api.get('/cats');

export const getMoreCatImages = (already: number) => api.get(`/cats?$skip=${already}`);

export const getCatImagesSince = (date: string) =>
    api.get(`/cats?since=${date}`);

export const addCatImage = (catImage: ImageToUpload) =>
    api.post(`/cats`, catImage);

export const toggleCatImageLike = (imageUuid: string) =>
    api.post(
        `/cats/${imageUuid}/likes`
    );
