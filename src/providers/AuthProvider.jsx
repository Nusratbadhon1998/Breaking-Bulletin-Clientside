import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import axios from "axios";
import app from "../firebase/firebase.config";
import { axiosSecure } from "../hooks/useAxiosSecure";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// create Auth-context
export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [loggedUser, isLoading] = useUser();
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  // Get token from server
  const getToken = async (email) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/jwt`,
      { email },
      { withCredentials: true }
    );
    setLoading(false);

    return data;
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (currentUser) => {
      console.log(currentUser)
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users`,
        currentUser
      );
      console.log(data);
      return data;
    },
  
    onSuccess: (data, currentUser) => {
      if (data.premiumReset) {
        toast.warning("Your subscription is over");
      }
  
      queryClient.invalidateQueries("user", currentUser.email);
    },
  });
  
  // save user
  const saveUser = async (user) => {
    const currentUser = {
      email: user?.email,
      name:user?.displayName ||"Anonymous",
      photo: user?.photoURL || "No Photo",
      loginTime: new Date(),
    };
    console.log(currentUser)
    const { data } = await mutateAsync(currentUser);
    return data;
  };

  // Check subscription
  // const checkSubscription = async (email) => {
  //   const loginTime = new Date();
  //   try {
  //     const { data } = await axiosSecure.patch(`/login`, { email, loginTime });
  //     console.log(data);

  //     if (data) {
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      // if user exists then issue a token
      if (currentUser) {
        getToken(loggedUser.email);
        saveUser(currentUser);
      } else {
        axios
          .get(`${import.meta.env.VITE_BASE_URL}/logout`, {
            withCredentials: true,
          })
          .then((res) => {
            setLoading(false);
          });
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
