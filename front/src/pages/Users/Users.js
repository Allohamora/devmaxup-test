import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';

const Users = () => {
  const { isLoading, error, data } = useQuery('users', userService.getUsersList);

  if( isLoading ) return <div>Loading...</div>;
  if( error ) return <Link to="/" >to /</Link>

  return (
    <div>{JSON.stringify(data)}</div>
  );
};

export default Users;
