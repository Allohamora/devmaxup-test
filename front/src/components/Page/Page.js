import React from 'react';
import { AppBar, Box, makeStyles, Toolbar, Typography, Container } from '@material-ui/core';
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
        <Toolbar component={Container} >
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
      <Box padding={2} component={Container} >
        {children}
      </Box>
    </div>
  );
};

export default Page;
