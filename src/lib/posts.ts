import db from "./db";

export const getPosts = async () => {
    const posts = await db.collection("posts").getFullList();
    return posts;
}

export const fetchPost = async (id: string) => {
    const post = await db.collection("posts").getOne(id);
    return post;
}