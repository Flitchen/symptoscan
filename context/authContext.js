import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const { createContext } = require("react");

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user?.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnaphot = await getDoc(docRef);

    if (docSnaphot.exists()) {
      let data = docSnaphot.data();
      setUser({
        username: data.username,
        userId: data.userId,
        email: data.email,
      });
    }
  };
  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      // console.log(error);
      let msg = error.message;

      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid email or password";
      }

      if (msg.includes("(auth/invalid-credential)")) {
        msg = "Invalid email or password";
      }
      if (msg.includes("(auth/network-request-failed)")) {
        msg = "Network error";
      }
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUser(null);
      return { success: true };
    } catch (error) {
      // console.log(error);
      return { success: false, msg: error.message };
    }
  };

  const signup = async (email, username, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("user response: ", response?.user);

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        userId: response?.user?.uid,
        email: response?.user?.email,
      });
      return { success: true, data: response?.user };
    } catch (error) {
      // console.log(error.message);
      let msg = error.message;
      if (msg.includes("(auth/email-already-in-use)")) {
        msg = "Email is already in use";
      }
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid email";
      }
      if (msg.includes("(auth/weak-password)")) {
        msg = "Password is too weak";
      }
      if (msg.includes("(auth/network-request-failed)")) {
        msg = "Network error";
      }
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, signup, logout, updateUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped in AuthContextProvider");
  }
  return value;
};
