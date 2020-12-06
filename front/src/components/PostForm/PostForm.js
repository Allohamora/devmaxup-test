import React from 'react';
import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../../validation/post';

const useStyles = makeStyles({
  formInner: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    maxWidth: 500,
    margin: '0 auto',
    '& > *:not(:first-child)': {
      marginTop: 15
    }
  }
});

/**
 * 
 * @param {{ onSubmit: (data: {title: string, body: string}) => void, title: string }} props 
 */
const PostForm = ({
  onSubmit = (data) => console.log(data),
  title = 'PostForm'
}) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(postSchema),
    mode: 'all'
  });

  const cls = useStyles();

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className={cls.formInner} >
        <Typography>{title}</Typography>
        <TextField 
          name="title"
          label="title"
          variant="outlined"
          inputRef={register()}
          error={!!errors.title}
          helperText={errors?.title?.message}
          fullWidth
        />
        <TextField
          name="body"
          label="body"
          variant="outlined"
          inputRef={register()}
          error={!!errors.body}
          helperText={errors?.body?.message}
          fullWidth
          multiline
          rows={6}
        />
        <div>
          <Button 
            type="submit" 
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
