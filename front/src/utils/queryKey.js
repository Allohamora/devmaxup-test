import { replacePostId, replaceUserId } from "./replace";

const editStatistics = 'edit-statistics-:userId';
const users = 'users';
const userPosts = 'user-posts-:userId';
const post = 'post-:postId';

export const getQueryKey = {
  editStatistics: (userId) => replaceUserId(editStatistics, userId),
  users: () => users,
  userPosts: (userId) => replaceUserId(userPosts, userId),
  post: (postId) => replacePostId(post, postId)
};