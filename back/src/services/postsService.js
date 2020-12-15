const Post = require('../models/Post');
const { postSchema, postUpdateSchema } = require('../validation/post');

const newPostValidate = async (postData) => {
  await postSchema.validate(postData);
};

const updatePostValidate = async (postData) => {
  await postUpdateSchema.validate(postData);
};

class PostsSequelizeService {
  getPostsByUserId = async (userId) => {
    const result = await Post.findAll({ where: { userId } });

    return result;
  };

  getPostById = async (id) => {
    const result = await Post.findOne({ where: { id } });

    return result;
  };

  createPost = async ({ id, ...postData }) => {
    const result = await Post.create(postData);

    return result;
  };

  validateAndCreatePost = async (postData) => {
    await newPostValidate(postData);

    return this.createPost(postData);
  };

  updatePost = async ({ userId, id, ...postData }) => {
    const result = await Post.update(postData, { where: { id } });

    return result;
  };

  validateAndUpdatePost = async (postData) => {
    await updatePostValidate(postData);

    return this.updatePost(postData);
  };
};

const postsService = new PostsSequelizeService();

module.exports = postsService;