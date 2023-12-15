import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CustomHeader from "../../headers/custom-header/CustomHeader";
import PostView from "../../PostView";
import axios from "axios";
import ServerUrl from "../../../ServerUrl";
import { RefreshControl } from "react-native";

export default function Home({ navigation, route }) {
  const [user, setUser] = useState(route.params?.user);
  const [post, setPost] = useState({});
  const [reload, setReload] = useState({});

  const [refreshing, setRefreshing] = useState(false);

  const count = useRef(0);

  useEffect(() => {
    axios.get(ServerUrl + "/api/posts").then((response) => {
      // console.log(response.data);
      setPost(response.data);
    });
  }, []);

  const BreakSpace = () => {
    return (
      <View
        style={{ backgroundColor: "#f1f3f5", height: 10, width: "100vw" }}
      ></View>
    );
  };

  forceRender = () => {
    this.forceUpdate();
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Home" user={user} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={post}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              axios.get(ServerUrl + "/api/posts").then((response) => {
                // console.log(response.data);
                setPost(response.data);
              });
            }}
          />
        }
        renderItem={({ item }) => {
          return <PostView item={item} user={user} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },

  postTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },

  avatarUser: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  shareButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    marginLeft: 10,
  },

  commentButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    marginLeft: 10,
  },

  upVoteButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
  },

  viewVote: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 20,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnIcon: {
    height: 20,
    width: 20,
    marginRight: 5,
    marginLeft: 5,
  },
});
