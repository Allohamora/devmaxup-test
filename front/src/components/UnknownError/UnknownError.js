import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { paths } from '../../utils/path';

const UnknownError = () => {
  return (
    <div>
      <div>Unknown Error! </div>
      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to={paths.main}
      >
        to {paths.main}
      </Button>
    </div>
  );
};

export default UnknownError;
