import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  Image,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import CustomHeader from "../../headers/custom-header/CustomHeader";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function CommunityTabScreen() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.userReducer.user);

  const [communities, setcommunities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handlePress = ({ communityId, user }) => {
    // const community = communities.find((item) => item.id === communityId);
    // Xử lý khi nút được nhấn
    navigation.navigate("MenuStackScreen", {
      screen: "UserCommunityScreen",
      params: { communityId, user },
    });
  };

  useEffect(() => {
    axios
      .post(ServerUrl + "/api/communities/all")
      .then((response) => {
        setcommunities(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader title="Community" user={user} />
      {/* <Text>Community Screen</Text> */}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              axios
                .post(ServerUrl + "/api/communities/all")
                .then((response) => {
                  setcommunities(response.data);
                  // console.log(response.data);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          />
        }
      >
        {communities.map((item) => {
          return (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#bfbfbf", false)}
              key={item.id}
              onPress={handlePress.bind(this, { communityId: item.id, user })}
            >
              <View style={styles.item}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          );
        })}
      </ScrollView>
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
