import { View, Text, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function EmptyMessages() {
  return (
    <View className="flex-1 justify-between items-center">
      <Image
        source={require("../assets/images/login.png")}
        style={{ height: hp(30), width: hp(30) }}
      />
      <Text
        style={{ fontSize: hp(3) }}
        className="text-center text-primary-text font-bold tracking-widest"
      >
        What are you suffering from
      </Text>
    </View>
  );
}
