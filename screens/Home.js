import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
  ArrowLeftStartOnRectangleIcon,
  Bars2Icon,
  PlusIcon,
} from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TextColor } from "../constants";
import ImageSlider from "../components/imageSlider";
import { db } from "../firebaseConfig";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Loading from "../components/loading";
import ConversationList from "../components/conversationList";

export default function Home() {
  const { user, logout } = useAuth();
  const [myChats, setMyChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newChatLoading, setNewChatLoading] = useState(false);
  const handleLogout = async () => {
    await logout();
    navigation.replace("AuthStack");
  };
  const navigation = useNavigation();
  const createNewChat = async () => {
    setNewChatLoading(true);
    const newRoomRef = await addDoc(collection(db, "rooms"), {
      createdAt: Timestamp.fromDate(new Date()),
      userId: user.userId,
      username: user.username,
    });

    const newRoom = doc(db, "rooms", newRoomRef.id);

    await updateDoc(newRoom, {
      roomId: newRoomRef.id,
    });
    setNewChatLoading(false);
    navigation.navigate("Chat", { roomId: newRoomRef.id });
  };

  useEffect(() => {
    const q = query(
      collection(db, "rooms"),
      where("userId", "==", user.userId ? user.userId : user.uid)
    );

    let unsubscribe = onSnapshot(q, (snapshot) => {
      let myChatRooms = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMyChats([...myChatRooms]);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <View className="flex-1 bg-screen-bg">
      <View className="flex-row justify-between items-center p-4 w-full">
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <View className="bg-iconBg rounded-full p-1">
            <Bars2Icon size={hp(3.5)} color={TextColor} />
          </View>
        </TouchableOpacity>
        <Text className="text-primary-text tracking-wider font-bold text-lg">
          SYMPTOSCAN
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <View className="rounded-full">
            <ArrowLeftStartOnRectangleIcon size={hp(3.5)} color={"black"} />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <ImageSlider />
      </View>
      <Text className="my-6 text-lg ml-4 font-semibold tracking-wider">
        Recent Conversations
      </Text>
      {loading ? (
        <Loading />
      ) : (
        <ConversationList myChats={myChats} navigation={navigation} />
      )}
      <TouchableOpacity
        disabled={newChatLoading}
        onPress={createNewChat}
        className={`p-3 absolute bottom-10 right-5 z-50 rounded-full bg-primary-orange ${
          newChatLoading ? "opacity-70" : ""
        }`}
      >
        <PlusIcon size={hp(3)} strokeWidth={2.5} color="white" />
      </TouchableOpacity>
    </View>
  );
}
