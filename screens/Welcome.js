import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
export default function Welcome() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center justify-around bg-screen-bg">
      <View>
        <Text
          style={{ fontSize: hp(3) }}
          className="text-center text-primary-text font-bold tracking-widest"
        >
          WELCOME TO
        </Text>
        <Text
          style={{ fontSize: hp(3.8) }}
          className="text-center text-primary-orange-100 font-bold tracking-widest"
        >
          SYMPTOSCAN
        </Text>
      </View>
      <Image
        source={require("../assets/images/login.png")}
        style={{ height: hp(30), width: hp(30) }}
      />
      <TouchableOpacity
        onPress={() => navigation.replace("Login")}
        className="bg-primary-orange px-10 py-3 rounded-lg"
      >
        <Text
          style={{ fontSize: hp(3) }}
          className="text-primary-text font-bold tracking-widest"
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}
