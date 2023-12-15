import { Image, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ChatScreenHeader = (props) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 70,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MenuStackScreen", {
              screen: "MenuScreen",
              params: { user: props?.user },
            })
          }
        >
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
          {props.title}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("FindUserScreen", { user: props?.user })
          }
        >
          <MaterialCommunityIcons
            name="chat-plus-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScrenn")}>
          <Image
            source={{ uri: props?.user?.avatarUrl }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function ChatScreen({ navigation }) {
  const route = useRoute();

  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ChatScreenHeader title="Chats" user={user} />
      <View>
        <Text>Chat Screen</Text>
      </View>
    </View>
  );
}
