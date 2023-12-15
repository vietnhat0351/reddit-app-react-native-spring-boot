import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";

export default function CustomHeader(props) {
  const navigation = useNavigation();
  const [user, setUser] = useState(props.user);

  return (
    <View style={styles.containner}>
      <View style={styles.view1}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MenuStackScreen", {
              screen: "MenuScreen",
              params: { user: user },
            });
            // console.log(user);
          }}
        >
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
          {props.title}
        </Text>
      </View>

      <View style={styles.view2}>
        <Ionicons name="search" size={24} color="black" />
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScrenn")}>
          <Image source={{ uri: user.avatarUrl }} style={styles.avatarUser} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containner: {
    height: 70,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },

  avatarUser: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  },

  view1: {
    flex: 1,
    flexDirection: "row",
  },

  view2: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
