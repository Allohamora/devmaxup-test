import React from 'react';
import postsService from '../../services/postsService';
import Page from '../../components/Page';
import UnknownError from '../../components/UnknownError';
import Loader from '../../components/Loader';
import PostForm from '../../components/PostForm';
import { useMutation, useQuery, useQueryCache } from 'react-query';
import { useParams } from 'react-router-dom';
import { UserNewPostTop } from '../UserNewPost';
import { toast } from 'react-toastify';
import { error } from '../../utils/logger';

const UserEditPost = () => {
  const { postId, userId } = useParams();

  const { isLoading, isError, data } = useQuery(`post-${postId}`, () => postsService.getPost({ postId }));

  const cache = useQueryCache();
  const [editPost] = useMutation(postsService.editPost, {
    onSuccess: () => cache.invalidateQueries(`post-${postId}`),
    throwOnError: true
  });

  if( isError ) return <Page><UnknownError /></Page>;
  if( isLoading ) return <Page><Loader /></Page>;

  const onSubmit = async ({ title, body }) => {
    try {
      await editPost({ title, body, postId, userId });
      toast(`Success updated post with id: ${postId}`, { type: 'success' });
    } catch (e) {
      error(e);
      toast(`Error with updating post with id: ${postId}`, { type: 'error' });
    }
  };

  return (
    <Page>
      <UserNewPostTop />
      <PostForm 
        title={`Edit post with id: ${postId}`}
        onSubmit={onSubmit}
        defaultValues={data}
      />
    </Page>
  );
};

export default UserEditPost;
