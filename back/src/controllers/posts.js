const Post = require('../models/Post');
const EditPostLog = require('../models/EditPostLog');
const createController = require('../utils/createController');
const routeDecorator = require('../utils/routeDecorator');
const { postSchema, postUpdateSchema } = require('../validation/post');
const { error } = require('../utils/logger');

const controller = createController('/posts');
const { router } = controller;

// get posts by userId
router.get('/:userId', routeDecorator(async ({ req, reply }) => {
  const { params } = req;
  const { userId } = params;

  let result;

  try {
    result = await Post.findAll({ where: { userId } });
  } catch (e) {
    return reply({ success: false, message: 'Error with finded posts!', data: e });
  }

  reply({ success: true, message: `List of user ${userId} posts!`, data: result });
}));

// create new post
router.post('/', routeDecorator(async ({ req, reply }) => {
  const { body } = req;
  
  const post = { ...body, id: undefined };

  let result;

  try {
    await postSchema.validate(post);

    result = await Post.create(post);
  } catch (e) {
    return reply({ success: false, message: 'Error with creating', data: e });
  }

  reply({ success: true, message: `Success created! Id: ${result.dataValues.id}` });
}));

// update post
router.put('/', routeDecorator(async ({ req, reply }) => {
  const { body } = req;
  
  const post = { ...body };

  const { id, userId } = post;

  try {
    await postUpdateSchema.validate(post);

    await Post.update(
      post, 
      { where: { id } }
    );
  } catch (e) {
    return reply({ success: false, message: 'Error with updating', data: e });
  }

  try {
    await EditPostLog.create({ postId: id, userId });
  } catch (e) {
    error(e);
  }

  reply({ success: true, message: `Success updated! Id: ${id}` });
}));

module.exports = controller;