const yup = require('yup');

const postBase = {
  title: yup.string().min(3).max(35).required(),
  body: yup.string().min(3).max(255).required(),
  userId: yup.string().required(),
  id: yup.number()
};

const postUpdateSchema = yup.object().shape({
  ...postBase,
  id: postBase.id.required(),
});

const postSchema = yup.object().shape({
  ...postBase,
}).defined();

module.exports = {
  postSchema,
  postUpdateSchema
};
