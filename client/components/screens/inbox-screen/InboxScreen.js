import { Image, Text, TouchableOpacity, View, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const InboxScreen = ({ route, navigation }) => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Text>Inbox</Text>
    </View>
  );
};

export default InboxScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
