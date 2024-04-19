import React from "react";
import Navigation from "./navigation";
import { StatusBar } from "react-native";
import { AuthContextProvider } from "./context/authContext";

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar barStyle={"light-content"} backgroundColor={`#FC9D45`} />
      <Navigation />
    </AuthContextProvider>
  );
}
