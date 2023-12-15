// RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import ServerUrl from "../../../ServerUrl";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    axios
      .post(ServerUrl + "/api/users/create", {
        email,
        username,
        password,
      })
      .then((response) => {
        console.log(
          response.data,
          "Đăng ký thành công:",
          response.data.message
        );
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error, "Đăng ký không thành công:", response.data.message);
      });
  };

  // const handleRegister = async () => {
  //   try {
  //     const response = await axios
  //       .post(ServerUrl + "/api/users/create", {
  //         email,
  //         username,
  //         password,
  //       })
  //       .then((response) => {
  //         console.log(
  //           response.data,
  //           "Đăng ký thành công:",
  //           response.data.message
  //         );
  //         navigation.navigate("Login");
  //       })
  //       .catch((error) => {
  //         console.log(
  //           error,
  //           "Đăng ký không thành công:",
  //           response.data.message
  //         );
  //       });
  //   } catch (error) {
  //     // Xử lý lỗi nếu không thể kết nối với máy chủ
  //     console.error("Lỗi kết nối:", error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flex: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 3,
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <TouchableOpacity
            style={{ marginTop: 30, marginLeft: 10 }}
            onPress={() => navigation.navigate("Login")}
          >
            <Ionicons name="arrow-back-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 7 }}>
          <Image
            source={require("../../../assets/reddit-logo.png")}
            style={styles.logo}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flex: 7,
        }}
      >
        <Text style={styles.title}>Đăng ký</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Tên người dùng"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Đăng ký" onPress={handleRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default RegisterScreen;
