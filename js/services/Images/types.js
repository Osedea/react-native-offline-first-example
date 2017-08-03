type Comment = {
    content: string,
    authorName: string,
};

export type Image = {
    url: string,
    comments: [Comment],
};
