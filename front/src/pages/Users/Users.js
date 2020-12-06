import React, { useState } from 'react';
import UnknownError from '../../components/UnknownError';
import userService from '../../services/userService';
import Page from '../../components/Page';
import NewUserDialog from './NewUserDialog';
import { useQuery } from 'react-query';
import { Button, CircularProgress, List, ListItem, ListItemText, ListSubheader, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  top: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 10,
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  
}))

const Users = () => {
  const { isLoading, error, data } = useQuery('users', userService.getUsersList);

  const cls = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if( isLoading ) return <CircularProgress />;
  if( error ) return <UnknownError />;

  return (
    <Page>
      <div className={cls.top} >
        <Button color="primary" variant="contained" onClick={openModal} >New user</Button>
      </div>

      <List
        subheader={
          <ListSubheader>
            <Typography variant="h6" >
              Users
            </Typography>
          </ListSubheader>
        }
        className={cls.list}
      >
        {
          data.map(({ id, name }) => (
            <ListItem key={id} button >
              <ListItemText component={Link} to={`/${id}`} >
                {id} / {name}
              </ListItemText>
            </ListItem>
          ))
        }
      </List>

      <NewUserDialog 
        isOpen={isOpen}
        onClose={closeModal}
      />
    </Page>
  );
};

export default Users;
