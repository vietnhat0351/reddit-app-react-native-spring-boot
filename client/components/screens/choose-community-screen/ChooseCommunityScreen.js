import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function ChooseCommunityScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [user, setUser] = useState(route.params?.user);
  const [communities, setCommunities] = useState({});
  useEffect(() => {
    axios
      .post(ServerUrl + "/api/communities/user", {
        id: user.id,
      })
      .then((response) => {
        setCommunities(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text>Choose Community</Text>
      </View>
      <FlatList
        data={communities}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  width: "100%",
                  marginBottom: 10,
                  backgroundColor: "#0f0fff",
                }}
                onPress={() => {
                  navigation.navigate("CreateScreen", { community: item });
                }}
              >
                <View
                  style={{
                    padding: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: 30, height: 30, borderRadius: 15 }}
                  />
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
    color: "white",
  },
});
