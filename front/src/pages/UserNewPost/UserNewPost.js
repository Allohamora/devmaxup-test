import React from 'react';
import Page from '../../components/Page';
import PostForm from '../../components/PostForm/PostForm';
import postsService from '../../services/postsService';
import { Box, Button, makeStyles } from '@material-ui/core';
import { useMutation, useQueryCache } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { error } from '../../utils/logger';
import { getPath } from '../../utils/path';

const useStyles = makeStyles({
  top: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

const UserNewPost = () => {
  const { userId } = useParams();

  const cls = useStyles();

  const cache = useQueryCache();
  const [newPost] = useMutation(postsService.newPost, {
    onSuccess: () => cache.invalidateQueries(`user-${userId}-posts`),
    throwOnError: true
  });

  const onSubmit = async ({ title, body }) => {
    try {
      await newPost({ userId, title, body });
      toast('Success added new post!', { type: 'success' });
    } catch (e) {
      error(e);
      toast('Error with saving new post!', { type: 'error' });
    }
  }

  return (
    <Page>
      <Box paddingBottom={1} className={cls.top} >
        <Button 
          variant="outlined"
          component={Link} 
          to={getPath.userPosts(userId)} 
        >
          back
        </Button>
      </Box>
      <PostForm 
        onSubmit={onSubmit}
        title="New Post Form"
      />
    </Page>
  );
};

export default UserNewPost;
