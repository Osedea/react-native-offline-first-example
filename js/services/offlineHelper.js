// @flow
const makeOfflineInterceptable = (
    thunk: () => void,
    dismissingActions: Array<string> = []
) => {
    thunk.interceptInOffline = true;
    thunk.meta = {
        retry: true,
        dismiss: dismissingActions,
    };

    return thunk;
};

export default makeOfflineInterceptable;
