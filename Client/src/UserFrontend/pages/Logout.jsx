
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Set the current user to null and navigate to the Signin page
    setCurrentUser(null);
    navigate('/Signin');
  }, [setCurrentUser, navigate]);

  return null; // No UI for this component
};

export default Logout;
