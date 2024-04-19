import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  PhoneIcon,
} from "react-native-heroicons/outline";
import { Orange, screenBg } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/authContext";
import Animated, { FadeInLeft, FadeOutUp } from "react-native-reanimated";
import Toast from "react-native-simple-toast";

const ios = Platform.OS == "ios";

export default function Login() {
  const { login } = useAuth();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const navigateToSignUp = () => {
    setUserCredentials({
      email: "",
      password: "",
    });
    navigation.navigate("SignUp");
  };
  const handleLogin = async () => {
    if (
      userCredentials.email.trim() == "" ||
      userCredentials.password.trim() == ""
    ) {
      setError("Please fill all the fields");
      setTimeout(() => {
        setError(null);
      }, 3000);
      setLoading(false);
      return;
    }

    setLoading(true);
    const response = await login(
      userCredentials.email,
      userCredentials.password
    );
    setLoading(false);

    if (!response.success) {
      setError(response.msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
      Toast.show(response.msg);
      return;
    }
    navigation.replace("ChatStack");
  };

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: `${screenBg}` }}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          gap: 40,
          paddingBottom: 40,
          paddingTop: 40,
        }}
      >
        <Image
          source={require("../assets/images/login.png")}
          style={{ height: hp(30), width: hp(30) }}
        />
        <View className="space-y-6">
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
          {error && (
            <Animated.Text
              entering={FadeInLeft}
              exiting={FadeOutUp}
              className="text-red-400 font-bold text-center text-base"
            >
              {error}
            </Animated.Text>
          )}
          {/* Text Inputs */}
          <KeyboardAvoidingView
            behavior={ios ? "padding" : "height"}
            keyboardVerticalOffset={90}
            style={{ paddingBottom: 40 }}
          >
            <View style={{ width: wp(80) }} className="space-y-3">
              <View className="flex-row space-x-6 px-4 py-3 items-center bg-white rounded-lg">
                <EnvelopeIcon size={hp(3.5)} color={Orange} />
                <TextInput
                  style={{ fontSize: hp(2.5) }}
                  className="flex-1 font-semibold text-primary-text"
                  placeholder="example@mail.com"
                  keyboardType="email-address"
                  value={userCredentials.email}
                  onChangeText={(text) =>
                    setUserCredentials({
                      ...userCredentials,
                      email: text,
                    })
                  }
                />
              </View>
              <View className="flex-row space-x-6 px-4 py-3 items-center bg-white rounded-lg">
                <LockClosedIcon size={hp(3.5)} color={Orange} />
                <TextInput
                  style={{ fontSize: hp(2.5) }}
                  className="flex-1 font-semibold text-primary-text"
                  placeholder="Password"
                  secureTextEntry={showPassword ? false : true}
                  value={userCredentials.password}
                  onChangeText={(text) =>
                    setUserCredentials({
                      ...userCredentials,
                      password: text,
                    })
                  }
                />
                {/* Show password toggle */}
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeSlashIcon size={hp(3.5)} color={Orange} />
                  ) : (
                    <EyeIcon size={hp(3.5)} color="gray" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        <View className="space-y-3">
          <TouchableOpacity
            disabled={loading}
            onPress={handleLogin}
            className={`bg-primary-orange px-10 py-3 rounded-lg ${
              loading ? "opacity-70" : ""
            }`}
          >
            {!loading ? (
              <Text
                style={{ fontSize: hp(3) }}
                className="text-primary-text font-bold tracking-widest text-center"
              >
                Login
              </Text>
            ) : (
              <ActivityIndicator color={"white"} />
            )}
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text className="text-primary-text">Don't have an account? </Text>
            <TouchableOpacity onPress={navigateToSignUp}>
              <Text className="text-primary-text font-bold">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
