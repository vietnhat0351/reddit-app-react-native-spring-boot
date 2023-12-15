import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
} from "react-native";
import ServerUrl from "../../../ServerUrl";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function FindUserScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [user, setUser] = useState(route.params?.user);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(ServerUrl + "/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePress = ({ receiver, user }) => {
    // Xử lý khi nút được nhấn
    navigation.navigate("ChatDetailScreen", {
      receiver,
      user,
    });
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#bfbfbf", false)}
            key={item.id}
            onPress={handlePress.bind(this, { receiver: item, user })}
          >
            <View style={styles.item}>
              <Image source={{ uri: item.avatarUrl }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.username}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    // padding: 10,
    alignItems: "center",
  },
  container: {
    // backgroundColor: "white",
    flex: 1,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
