import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import EmptyChats from "./emptyChats";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { formatDate } from "../utils";

export default function ConversationList({ myChats, navigation }) {
  const ConversationItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className=" border-b border-b-neutral-200"
        onPress={() => navigation.navigate("Chat", { roomId: item.roomId })}
      >
        <View className="rounded p-2 px-3">
          <Text
            style={{ fontSize: hp(2.5) }}
            className="text-primary-text text-semibold"
          >
            Conversation #{index + 1}
          </Text>

          <Text style={{ fontSize: hp(1.8) }} className="text-primary-text">
            {new Date(
              parseInt(item?.createdAt?.seconds) * 1000
            ).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}{" "}
            {formatDate(new Date(item.createdAt.seconds * 1000))}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const ChatBackground =
    myChats.length > 0 ? { backgroundColor: "white" } : null;
  return (
    <FlatList
      data={myChats}
      keyExtractor={(item, index) => index}
      renderItem={({ item, index }) => (
        <ConversationItem item={item} index={index} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        ...ChatBackground,
        borderRadius: 25,
        marginHorizontal: 16,
      }}
      ListEmptyComponent={<EmptyChats />}
    />
  );
}
