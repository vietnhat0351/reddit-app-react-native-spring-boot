// LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";
import axios from "axios";
import ServerUrl from "../../../ServerUrl";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/actions/UserActions";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Thực hiện xử lý đăng nhập ở đây (gọi API, kiểm tra đăng nhập, vv.)
    axios
      .post(ServerUrl + "/api/users", {
        email,
        password,
      })
      .then((response) => {
        dispatch(setUser(response.data));

        navigation.navigate("MenuTab", {
          screen: "Home",
          params: {
            screen: "HomeStack",
            params: {
              user: response.data,
            },
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 3,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 3 }}></View>
        <View style={{ flex: 7 }}>
          <Image
            source={require("../../../assets/reddit-logo.png")}
            style={styles.logo}
          />
        </View>
      </View>
      <View
        style={{
          flex: 7,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Đăng nhập</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Đăng nhập" onPress={handleLogin} />
        <Text style={styles.registerText}>
          Chưa có tài khoản?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register")}
          >
            Đăng ký
          </Text>
        </Text>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
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
  registerText: {
    marginTop: 10,
  },
  registerLink: {
    color: "blue",
  },
});

export default LoginScreen;
