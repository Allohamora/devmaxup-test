import { replacePostId, replaceUserId } from './replace';

const main = '/';
const users = '/users';
const userPosts = `${users}/:userId/posts`;
const userPostsNew = `${userPosts}/new`;
const userPostsEdit = `${userPosts}/:postId/edit`;
const userStatistics = `${users}/:userId/statistics`;

export const getPath = {
  userPosts: (userId) => replaceUserId(userPosts, userId),
  userPostsNew: (userId) => replaceUserId(userPostsNew, userId),
  userPostsEdit: (userId, postId) => replacePostId(replaceUserId(userPostsEdit, userId), postId),
  userStatistics: (userId) => replaceUserId(userStatistics, userId)
};

export const paths = {
  main,
  users,
  userPosts,
  userPostsNew,
  userPostsEdit,
  userStatistics
};
