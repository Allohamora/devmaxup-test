import React from 'react';
import Page from '../../components/Page';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { paths } from '../../utils/path';

const Main = () => (
  <Page>
    <Button 
      variant="contained"
      color="primary"
      component={Link} 
      to={paths.users}
    >
      to {paths.users}
    </Button>
  </Page>
);

export default Main;
