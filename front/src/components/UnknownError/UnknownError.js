import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const UnknownError = () => {
  return (
    <div>
      Unknown Error! 
      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to="/" 
      >
        to /
      </Button>
    </div>
  );
};

export default UnknownError;
