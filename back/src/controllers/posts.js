const Post = require("../models/Post");
const createController = require("../utils/createController");
const response = require("../utils/response");
const postSchema = require("../validation/post");

const controller = createController('/users');
const { router } = controller;

router.post('/:userId/posts/new', async (req, res) => {
  const { params, body } = req;
  const { userId } = params;
  const reply = response(res);

  const post = { userId, ...body, id: undefined };

  const isValid = await postSchema.isValid(post);

  if( !isValid ) return reply({ success: false, message: 'Invalid body data!' });

  try {
    await Post.create(post);
  } catch (e) {
    return reply({ success: false, message: 'Error with creating', data: e });
  }

  reply({ success: true, message: 'Success created!' });
});

module.exports = controller;