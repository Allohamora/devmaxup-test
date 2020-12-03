const Post = require('../models/Post');
const createController = require('../utils/createController');
const { response, responseServerError } = require('../utils/response');
const { postSchema, postUpdateSchema } = require('../validation/post');
const { error } = require('../utils/logger');

const controller = createController('/posts');
const { router } = controller;

router.get('/:userId', async (req, res) => {
  const reply = response(res);

  try {
    const { params } = req;
    const { userId } = params;

    let result;

    try {
      result = await Post.findAll({ where: { userId } });
    } catch (e) {
      return reply({ success: false, message: 'Error with posts!', data: e });
    }

    reply({ success: true, message: `List of ${userId} posts!`, data: result });
  } catch (e) {
    error(e);
    return responseServerError(res);
  }
});

router.post('/', async (req, res) => {
  const reply = response(res);

  try {
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
  } catch (e) {
    error(e);
    return responseServerError(res);
  }
});

router.put('/', async (req, res) => {
  const reply = response(res);

  try {
    const { body } = req;
  
    const post = { ...body };
  
    try {
      await postUpdateSchema.validate(post);

      await Post.update(
        post, 
        { where: { id: post.id } }
      );
    } catch (e) {
      return reply({ success: false, message: 'Error with updating', data: e });
    }
  
    reply({ success: true, message: `Success updated! Id: ${post.id}` });
  } catch (e) {
    error(e);
    return responseServerError(res);
  }
});

module.exports = controller;