// Import any necessary libraries or modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import{env} from '../environment'

// Define the component
function UserProfile() {
  // Set up state variables to hold user data and any errors
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Define a function to fetch the user data from the backend
  const fetchUser = async () => {
    try {
      // Send a GET request to the backend API to get the user data
      const response = await axios.get(`${env.apiurl}/users/myprofile`);

      // If the request was successful, set the user state variable
      setUser(response.data.user);
    } catch (error) {
      // If there was an error, set the error state variable
      setError(error.message);
    }
  };

  // Call the fetchUser function when the component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  // If there is an error, display it
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If the user data hasn't loaded yet, display a loading message
  if (!user) {
    return <div>Loading...</div>;
  }

  // If the user data has loaded, display it
  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default UserProfile;
