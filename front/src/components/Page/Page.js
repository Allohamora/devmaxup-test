import { AppBar, Box, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  brand: {
    color: 'white',
    textDecoration: 'none',

    '&:hover': {
      color: 'white'
    }
  }
});

const Page = ({ children }) => {
  const cls = useStyles();

  return (
    <div>
      <AppBar position="static" >
        <Toolbar>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            className={cls.brand}
          >
            App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box padding={2} >
        {children}
      </Box>
    </div>
  );
};

export default Page;
