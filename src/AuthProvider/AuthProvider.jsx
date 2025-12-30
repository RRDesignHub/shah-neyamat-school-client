import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.init";
import axios from "axios";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  // create user with email and password:
    const userCreate = (email, password) => {
      setLoader(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };

  const userLogin = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    setLoader(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        //  get jwt token from server
        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER_API}/jwt`,
          { email: currentUser?.email }
        );
        if (data?.token) {
          localStorage.setItem("access-token", data?.token);
          setLoader(false);
        }
      } else {
        setUser(currentUser);
        localStorage.removeItem("access-token");
        setLoader(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    userCreate,
    userLogin,
    user,
    setUser,
    loader,
    setLoader,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
