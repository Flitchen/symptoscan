import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Orange } from "../constants";

export default function Loading() {
  return (
    <View className="flex-1 items-center bg-screen-bg justify-center">
      <ActivityIndicator size={"large"} color={Orange} />
    </View>
  );
}
