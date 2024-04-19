import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../context/authContext";
import {
  ArrowLeftIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Orange, screenBg } from "../constants";
import MessageList from "../components/messageList";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Loading from "../components/loading";
import { askChatbot } from "../api/chatbot";

const ios = Platform.OS == ios;

export default function Chat() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { user } = useAuth();
  // console.log(params);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  let roomId = params.roomId;
  const sendMessage = async () => {
    try {
      setLoading(true);
      let newMesssage = message;
      setMessage("");
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");
      let newDoc = await addDoc(messageRef, {
        role: "user",
        message: newMesssage,
        createdAt: Timestamp.fromDate(new Date()),
      });
      askChatbot(newMesssage).then((response) => {
        // console.log("response: ", response);
        newDoc = addDoc(messageRef, {
          role: "model",
          message: response,
          createdAt: Timestamp.fromDate(new Date()),
        });
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateFlatlist();
  }, [messages]);
  const updateFlatlist = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  useEffect(() => {
    setMessagesLoading(true);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    let unsubscribe = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
      setMessagesLoading(false);
    });

    const KeyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateFlatlist
    );
    return () => {
      unsubscribe();
      KeyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View className="flex-1">
      {/* Chat Header */}
      <View className="flex-row space-x-4 px-4 py-3 items-center bg-white shadow">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={hp(3)} color={"black"} />
        </TouchableOpacity>
        <View className="w-[80%]">
          <Text className=" text-primary-text text-center tracking-wider font-bold text-lg">
            SYMPTOSCAN
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={ios ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: `${screenBg}` }}
      >
        {messagesLoading ? (
          <Loading />
        ) : (
          <MessageList scrollRef={scrollRef} messages={messages} />
        )}
      </KeyboardAvoidingView>
      {/* TextInput for sending symptoms */}
      <View className="absolute bottom-0 space-x-2 p-3 flex-row items-center bg-white border-t border-gray-300">
        <TextInput
          placeholder="Type Message"
          multiline={true}
          value={message}
          onChangeText={(text) => setMessage(text)}
          className="flex-1 py-1 text-base rounded-full"
        />

        <View className="flex-row items-center ">
          {message && (
            <TouchableOpacity
              onPress={() => {
                sendMessage();
              }}
            >
              {/* Send Icon Svg */}
              <PaperAirplaneIcon color={Orange} size={hp(3)} />
            </TouchableOpacity>
          )}
          {loading && !message && <ActivityIndicator color={Orange} />}
        </View>
      </View>
    </View>
  );
}
