/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import axios from "axios";

//Create the context
const AuthContext = createContext();

//Create the wrapper
function AuthProviderWrapper(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        const response = await axios.get(`${import.meta.env.VITE_MONGO_URL}/api/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        //The next part happens if the login was succesfful
        setLoggedIn(true);
        setUser(response.data);
        setLoading(false);
      } else {
        setLoggedIn(false);
        setUser(null);
        setLoading(false);
      }
    } catch (error) {
      //if there's a problem with auth, we don't want a logged in user
      setLoggedIn(false);
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const logout = () => {
    //first, we remove the token from the local storage
    localStorage.removeItem("authToken");
    //we run authenticate again to reset the states
    console.log("User logged out");
    authenticateUser();
  };

  // funtion to call the backend route updateToken that updates the token everytime the user to perform changes
  const tokenUpdate = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await axios.get(
        `http://localhost:5005/api/updateToken`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        user,
        loading,
        storeToken,
        authenticateUser,
        logout,
        tokenUpdate,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
