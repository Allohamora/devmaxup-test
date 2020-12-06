/**
 * 
 * @param {string} str 
 * @param {number | string} userId 
 */
export const replaceUserId = (str, userId) => str.replace(':userId', userId);

/**
 * 
 * @param {string} str 
 * @param {number | string} postId 
 */
export const replacePostId = (str, postId) => str.replace(':postId', postId);
