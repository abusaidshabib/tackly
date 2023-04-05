import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [preLoading, setPreLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth,
      currentUser => {
        setUser(currentUser);
        setLoading(false);
      })
    return () => unSubscribe();
  }, [])


  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  }

  const verify = () => {
    return sendEmailVerification(auth.currentUser)
  }

  const googlePopUp = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth);
  }

  const passReset = (email) => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }


  const value = {
    createUser, updateUser, verify, user, logIn, googlePopUp, logOut, loading, preLoading, passReset,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};

export default UserContext;