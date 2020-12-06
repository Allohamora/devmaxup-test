const main = '/';
const users = '/users';
const userPosts = `${users}/:userId/posts`;
const userPostsNew = `${userPosts}/new`;
const userPostsEdit = `${userPosts}/:postId/edit`;

const replaceUserId = (str, userId) => str.replace(':userId', userId);
const replacePostId = (str, postId) => str.replace(':postId', postId);

export const getPath = {
  userPosts: (userId) => replaceUserId(userPosts, userId),
  userPostsNew: (userId) => replaceUserId(userPostsNew, userId),
  userPostsEdit: (userId, postId) => replacePostId(replaceUserId(userPostsEdit, userId), postId),
};

export const paths = {
  main,
  users,
  userPosts,
  userPostsNew,
  userPostsEdit
};