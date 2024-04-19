import { Image, Text, View } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function CustomDrawerComponent(props) {
  return (
    <View className={`flex-1 bg-white`}>
      <DrawerContentScrollView {...props}>
        <View className="p-5 flex-row items-center space-x-4">
          <Image
            source={require("../assets/images/signup.png")}
            style={{ height: hp(10), width: hp(10) }}
          />
          <Text className="text-center text-primary-orange text-lg font-bold tracking-widest">
            SYMPTOSCAN
          </Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}
