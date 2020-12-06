import * as yup from 'yup';

export const postSchema = yup.object().shape({
  title: yup.string().min(3).max(35).required(),
  body: yup.string().min(3).max(255).required()
});