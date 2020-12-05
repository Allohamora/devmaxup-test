import React, { useState } from 'react';
import UnknownError from '../../components/UnknownError';
import userService from '../../services/userService';
import Page from '../../components/Page';
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, ListSubheader, makeStyles, TextField, Typography } from '@material-ui/core';
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
  const cache = useQueryCache();
  const { isLoading, error, data } = useQuery('users', userService.getUsersList);
  const [newUser] = useMutation(userService.newUser, {
    onSuccess: () => cache.invalidateQueries('users')
  });
  const cls = useStyles();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const addNewUser = () => {
    newUser(name);
    setName('');
    setOpen(false);
  }

  const nameHandler = (e) => {
    setName(e.target.value);
  }

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    setName('');
  };

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

      <Dialog open={open} onClose={closeModal} >
        <DialogTitle>Add new user</DialogTitle>
        <DialogContent>
          <TextField 
            autoFocus
            fullWidth
            variant="outlined"
            label="Name"
            type="text"
            value={name}
            onChange={nameHandler}
            
          />
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={addNewUser}
            disabled={name.trim().length < 3}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
};

export default Users;
