const createController = require('../utils/createController');
const routeDecorator = require('../utils/routeDecorator');
const { error } = require('../utils/logger');
const postsService = require('../services/postsService');
const editPostStatisticService = require('../services/editPostStatisticService');

const controller = createController('/posts');
const { router } = controller;

// get posts by userId
router.get('/user/:userId', routeDecorator(async ({ req, reply }) => {
  const { params } = req;
  const { userId } = params;

  let result;

  try {
    result = await postsService.getPostsByUserId(userId);
  } catch (e) {
    return reply({ success: false, message: 'Error with finded posts!', data: e });
  }

  reply({ success: true, message: `List of user ${userId} posts!`, data: result });
}));

// get post by id
router.get('/:postId', routeDecorator(async ({ req, reply }) => {
  const { params } = req;
  const { postId } = params;

  let result;

  try {
    result = await postsService.getPostById(postId);
  } catch (e) {
    return reply({ success: false, message: 'Error with finded posts!', data: e });
  }

  reply({ success: true, message: `Post with id: ${postId}`, data: result });
}))

// create new post
router.post('/', routeDecorator(async ({ req, reply }) => {
  const { body } = req;
  
  const postData = { ...body, id: undefined };

  let result;

  try {
    result = await postsService.validateAndCreatePost(postData);
  } catch (e) {
    return reply({ success: false, message: 'Error with creating', data: e });
  }

  reply({ success: true, message: `Success created! Id: ${result.dataValues.id}` });
}));

// update post
router.put('/', routeDecorator(async ({ req, reply }) => {
  const { body } = req;
  
  const postData = { ...body };

  const { id, userId } = body;

  try {
    await postsService.validateAndUpdatePost(postData);
  } catch (e) {
    return reply({ success: false, message: 'Error with updating', data: e });
  }

  try {
    await editPostStatisticService.createOrUpdateTodayLog(id, userId);
  } catch (e) {
    error(e);
  }

  reply({ success: true, message: `Success updated! Id: ${id}` });
}));

module.exports = controller;