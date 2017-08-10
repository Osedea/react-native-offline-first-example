type NormalAction = {
    type: string,
    payload: Object,
    meta: Object,
};

type OfflineAction = {
    type: string,
    payload: string,
    meta: {
        offline: {
            effect: { url: string, method: 'POST' | 'GET' | 'PUT' | 'DELETE' },
            commit: NormalAction,
            rollback: NormalAction
      }
    },
};

export type Action = NormalAction | OfflineAction;

export type Comment = {
    content: string,
    authorName: string,
};

export type CatImage = {
    url: string,
    comments: [Comment],
};
