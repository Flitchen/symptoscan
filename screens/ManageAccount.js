import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
  ArrowLeftIcon,
  UserCircleIcon,
  PencilSquareIcon,
  CheckIcon,
  CheckCircleIcon,
} from "react-native-heroicons/outline";
import { useAuth } from "../context/authContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Toast from "react-native-simple-toast";

export default function ManageAccount() {
  const navigation = useNavigation();
  const { user, updateUserData } = useAuth();
  const [editUsername, setEditUsername] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);

  const updateUsername = async () => {
    setLoading(true);
    const docRef = doc(db, "users", user.userId);
    await updateDoc(docRef, {
      username,
    });
    updateUserData(user.userId);
    Toast.show("Username updated successfully");
    setLoading(false);
    setEditUsername(false);
  };

  const goBack = () => {
    setEditUsername(false);
    navigation.goBack();
  };
  return (
    <TouchableWithoutFeedback onPress={() => setEditUsername(false)}>
      <View className="flex-1 items-center bg-screen-bg py-10 space-y-8">
        <TouchableOpacity
          onPress={goBack}
          className=" absolute top-5 left-3 p-3 rounded-full bg-white"
        >
          <ArrowLeftIcon size={hp(3)} color={"black"} />
        </TouchableOpacity>
        <View className="bg-cyan-600/20 rounded-full">
          <Image
            source={require("../assets/images/login.png")}
            style={{ height: hp(25), width: hp(25) }}
          />
        </View>
        <View className="flex items-center">
          <View className="flex-row space-x-4 items-center bg-white p-3">
            <UserCircleIcon size={hp(5)} color={"gray"} />
            <View className="flex-1">
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-neutral-400 tracking-wider"
              >
                Username
              </Text>
              {!editUsername ? (
                <Text style={{ fontSize: hp(2.6) }} className=" text-black">
                  {user?.username}
                </Text>
              ) : (
                <TextInput
                  style={{ fontSize: hp(2.6) }}
                  className=" w-full font-semibold text-primary-text"
                  placeholder="Your Username"
                  autoFocus={editUsername}
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
              )}
            </View>
            {!editUsername ? (
              <TouchableOpacity onPress={() => setEditUsername(true)}>
                <PencilSquareIcon size={hp(3)} color={"gray"} />
              </TouchableOpacity>
            ) : (
              <>
                {loading ? (
                  <ActivityIndicator color="gray" />
                ) : (
                  <TouchableOpacity onPress={updateUsername}>
                    <CheckCircleIcon size={hp(3)} color={"gray"} />
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
