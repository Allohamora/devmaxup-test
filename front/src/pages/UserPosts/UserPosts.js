import React from 'react';
import Page from '../../components/Page';
import postsService from '../../services/postsService';
import Loader from '../../components/Loader';
import UnknownError from '../../components/UnknownError';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Box, Button, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { getPath } from '../../utils/path';

const useStyles = makeStyles({
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bodyCell: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *:first-child': {
      paddingRight: 10,
      alignSelf: 'center'
    }
  },
  row: {
    '& a': {
      opacity: 0,
      transition: '.5s'
    },
    '&:hover a': {
      opacity: 1
    }
  }
});

const UserPosts = () => {
  const { userId } = useParams();
  const { isLoading, isError, data } = useQuery(`user-${userId}-posts`, () => postsService.getPosts({ userId }));

  const cls = useStyles();

  if( isError ) return <Page><UnknownError /></Page>;
  if( isLoading ) return <Page><Loader /></Page>;

  return (
    <Page>
      <Box 
        paddingBottom={2} 
        className={cls.top} 
      >
        <Typography>User {userId} posts</Typography>

        <Button 
          color="primary" 
          variant="contained" 
          component={Link}
          to={getPath.userPostsNew(userId)}
        >
          New Post
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map(({ id, title, body }) => (
              <TableRow 
                key={id} 
                className={cls.row} 
              >
                <TableCell>{title}</TableCell>

                <TableCell className={cls.bodyCell} >
                  <div>{body}</div>

                  <div>
                    <Button 
                      variant="outlined" 
                      component={Link}
                      to={getPath.userPostsEdit(userId, id)}
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Page>
  );
};

export default UserPosts;
