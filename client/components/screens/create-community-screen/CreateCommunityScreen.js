import { Button } from "react-native";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import ServerUrl from "../../../ServerUrl";
import { useNavigation } from "@react-navigation/native";

export default function CreateCommunityScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const route = useRoute();
  const [user, setUser] = useState(route.params?.user);

  const navigation = useNavigation();

  const handleCreateCommunity = async () => {
    try {
      const response = await axios
        .post(ServerUrl + "/api/communities/create", {
          name,
          description,
          // userid
          userId: user.id,
        })
        .then((response) => {
          console.log(
            JSON.stringify(user.id),
            "Đăng ký thành công:",
            response.data.message
          );
          navigation.navigate("MenuStackScreen", {
            screen: "MenuScreen",
          });
        })
        .catch((error) => {
          console.log(
            error,
            "Đăng ký không thành công:",
            response.data.message
          );
        });
    } catch (error) {
      // Xử lý lỗi nếu không thể kết nối với máy chủ
      console.error("Lỗi kết nối:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Community name"
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        style={styles.description}
        onChangeText={(text) => setDescription(text)}
      />
      <Button title="Create" onPress={handleCreateCommunity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  description: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    height: 100,
  },
});
