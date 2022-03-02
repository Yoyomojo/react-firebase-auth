import React, { useEffect, useState } from "react";
import firebaseConfig from "./firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      if (user) {
        const userUID = user.uid;
        firebaseConfig
          .firestore()
          .collection('users')
          .doc(userUID)
          .onSnapshot(snapshot => {
              const userDetails = snapshot.data();
              setUser(userDetails);
              setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
   });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        authenticated: user !== null,
        setUser
      }}>
        {children}
     </AuthContext.Provider>
  );
};