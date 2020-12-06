import React from 'react';
import Page from '../../components/Page';
import postsService from '../../services/postsService';
import Loader from '../../components/Loader';
import UnknownError from '../../components/UnknownError';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Box, Button, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Typography, TableContainer } from '@material-ui/core';
import { getPath } from '../../utils/path';
import { getQueryKey } from '../../utils/queryKey';

const useStyles = makeStyles({
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 500px)': {
      flexFlow: 'column wrap'
    }
  },
  topButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > *:not(:first-child)': {
      marginLeft: 10
    }
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
    whiteSpace: 'nowrap',
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
  const { isLoading, isError, data } = useQuery(
    getQueryKey.userPosts(userId), 
    () => postsService.getPosts({ userId })
  );

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

        <div className={cls.topButtons} >
          <Button 
            color="secondary" 
            variant="contained" 
            component={Link}
            to={getPath.userStatistics(userId)}
          >
            Statistics
          </Button>
          <Button 
            color="primary" 
            variant="contained" 
            component={Link}
            to={getPath.userPostsNew(userId)}
          >
            New Post
          </Button>
        </div>
      </Box>
      <TableContainer>
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
      </TableContainer>
    </Page>
  );
};

export default UserPosts;
