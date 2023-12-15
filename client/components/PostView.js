import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Video } from "expo-av";
import { useRoute } from "@react-navigation/native";

export default function PostView(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const [postInfo, setpostInfo] = useState(props.item);
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    if (props?.item) {
      // console.log(route.params?.user);
      setpostInfo(props?.item);
    }
  }, [props?.item]);

  const BreakSpace = () => {
    return (
      <View
        style={{ backgroundColor: "#f1f3f5", height: 10, width: "100vw" }}
      ></View>
    );
  };

  const PostType = () => {
    if (postInfo.post.content != null) {
      return (
        <View>
          <Text>{postInfo.post.content}</Text>
        </View>
      );
    }
    if (postInfo.post.imgUrl != null) {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: "100%",
              maxHeight: 400,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: postInfo.post.imgUrl }}
              style={{
                width: "100%",
                height: undefined,
                aspectRatio: 1,
                resizeMode: "contain",
                borderRadius: 10,
                padding: 5,
              }}
            />
          </View>
        </View>
      );
    } else
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: "100%",
              maxHeight: 400,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Video
              // ref={video}
              style={{
                width: "100%",
                height: undefined,
                aspectRatio: 1,
                resizeMode: "contain",
                borderRadius: 10,
                padding: 5,
              }}
              source={{
                uri: postInfo.post.videoUrl,
              }}
              // source={{ uri: selectedVideo }}
              useNativeControls
              resizeMode="contain"
              isLooping
              // onPlaybackStatusUpdate={setStatus}
            />
          </View>
        </View>
      );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          padding: 10,
        }}
        // onPress={() => navigation.navigate("PostComment")}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Image
              source={{ uri: postInfo.communityImgUrl }}
              style={styles.avatarUser}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontWeight: "bold" }}>
              r/{postInfo.communityName}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.postTitle}>{postInfo.post.title}</Text>
        </View>

        <PostType />

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.viewVote}>
              <TouchableOpacity style={styles.upVoteButton}>
                <Image
                  style={styles.btnIcon}
                  source={require("../assets/likeicon.png")}
                ></Image>
                <Text style={{ paddingLeft: 5, fontWeight: "bold" }}>
                  {postInfo.likes.length}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingLeft: 5, paddingRight: 5 }}>
                <Image
                  style={styles.btnIcon}
                  source={require("../assets/dislikeicon.png")}
                ></Image>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.commentButton}
              onPress={() => {
                navigation.navigate("PostComment", {
                  user: user,
                  postId: postInfo.post.id,
                });
                // console.log(user);
                // console.log(postInfo.post.id);
              }}
            >
              <Ionicons
                name="chatbox-outline"
                size={20}
                color="black"
                style={{ marginLeft: 5, marginRight: 5 }}
              />
              <Text style={{ fontWeight: "bold" }}>
                {postInfo.post.comments.length} Comments
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity style={styles.shareButton}>
              <MaterialCommunityIcons
                name="share"
                size={20}
                color="black"
                style={{ marginLeft: 5, marginRight: 5 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BreakSpace />
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
