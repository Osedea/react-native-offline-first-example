export const SET_USER = 'USER/SET';

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
    meta: {
        offline: {
            effect: {
                url: '/users',
                method: 'POST',
            },
        },
    },
});
