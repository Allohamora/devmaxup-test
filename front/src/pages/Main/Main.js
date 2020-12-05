import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <Button 
      variant="contained"
      color="primary"
      component={Link} 
      to="/users" 
    >
      to /users
    </Button>
  );
};

export default Main;
