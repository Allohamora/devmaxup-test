const yup = require('yup');

const postSchema = yup.object().shape({
  title: yup.string().min(3).max(35).required(),
  body: yup.string().min(3).max(255).required(),
  userId: yup.string().required(),
  id: yup.number()
}).defined();

module.exports = postSchema;
