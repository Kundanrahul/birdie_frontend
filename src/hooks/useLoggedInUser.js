import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useLoggedInUser = () => {
  const user = useAuthState(auth);
  const email = user?.email;

  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch(`https://birdie-backend-ux74.onrender.com/loggedInUser?email=${email}`);
        const data = await response.json();
        setLoggedInUser(data);
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
      }
    };

    if (email) {
      fetchLoggedInUser();
    }
  }, [email]); // Remove loggedInUser from the dependency array

  return [loggedInUser, setLoggedInUser];
};

export default useLoggedInUser;
