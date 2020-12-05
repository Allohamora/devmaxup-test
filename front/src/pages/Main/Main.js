import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Page from '../../components/Page';

const Main = () => {
  return (
    <Page>
      <Box padding={3} >
        <Button 
          variant="contained"
          color="primary"
          component={Link} 
          to="/users" 
        >
          to /users
        </Button>
      </Box>
    </Page>
  );
};

export default Main;
