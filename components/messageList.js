import { View, Text, KeyboardAvoidingView, FlatList } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import EmptyMessages from "./emptyMessages";

export default function MessageList({ scrollRef, messages }) {
  const MessageBubble = ({ item }) => {
    const bubbleColor =
      item.role === "user"
        ? "bg-white rounded-tl-lg"
        : "bg-primary-orange rounded-tr-lg";
    const textColor = item.role === "user" ? "text-black" : "text-white";
    const textPosition = item.role === "user" ? "flex-row-reverse" : "flex-row";
    const marginSize = item.role === "user" ? "mr-0" : "mr-16";
    const timePosition = item.role === "user" ? "self-end" : "self-start";
    return (
      <View className={`mb-2 px-2 ${textPosition}`}>
        <View>
          <View
            className={` rounded-b-lg px-4 py-2 ${bubbleColor} ${marginSize}`}
          >
            <Text style={{ fontSize: hp(2.2) }} className={`${textColor}`}>
              {item.message}
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(1.2) }}
            className={`mt-1 mx-2 ${timePosition}`}
          >
            {new Date(
              parseInt(item?.createdAt?.seconds) * 1000
            ).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={messages}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => <MessageBubble item={item} />}
      contentContainerStyle={{
        paddingTop: 16,
        paddingBottom: 66,
      }}
      ref={scrollRef}
      ListEmptyComponent={<EmptyMessages />}
    />
  );
}
