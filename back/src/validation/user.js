const yup = require('yup');

const userSchema = yup.object().shape({
  name: yup.string().min(3).max(15).required(),
  id: yup.string()
}).defined();

module.exports = userSchema;