// @flow
import type { User } from 'DoOfflineFirstApps/js/types';
import api from 'DoOfflineFirstApps/js/api';

export const createUser = (user: User) =>
    api.post(
        '/users',
        {
            _id: user.uuid,
            email: user.uuid,
            password: user.uuid,
        }
    );

export const getUser = (user: User) =>
    api.get(`/users/${user.uuid}`);
