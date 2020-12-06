import React, { useState } from 'react';
import userService from '../../../services/userService';
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
import { useMutation, useQueryCache } from 'react-query';
import { toast } from 'react-toastify';
import { error } from '../../../utils/logger';

/**
 * 
 * @param {{onClose?: () => void; isOpen?: boolean}} props 
 */
const NewUserDialog = ({
  onClose,
  isOpen
}) => {
  const [name, setName] = useState('');

  const cache = useQueryCache();
  const [newUser] = useMutation(userService.newUser, {
    onSuccess: () => cache.invalidateQueries('users'),
    throwOnError: true
  });

  const submitHandler = async () => {
    try {
      await newUser({ name });
      setName('');
      toast('Success added a new user!', { type: 'success' });
    } catch (e) {
      error(e);
      toast('Error with add new user!', { type: 'error' });
    }

    onClose();
  }

  const nameHandler = (e) => setName(e.target.value);

  const isDisabled = name.trim().length < 3;

  return (
    <Dialog open={isOpen} onClose={onClose} >
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
          onClick={submitHandler}
          disabled={isDisabled}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewUserDialog;
