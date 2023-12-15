import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native";
import axios from "axios";
import { Video } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ServerUrl from "../../ServerUrl";

export default function PostComment(props) {
  const route = useRoute();

  const [user, setUser] = useState(route.params?.user);
  const [postId, setPostId] = useState(route.params?.postId);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    axios
      .post(ServerUrl + "/api/posts/post-comments", {
        id: postId,
      })
      .then((response) => {
        setPost(response.data);
        setComments(response.data.comments);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [route.params?.postId]);

  const CommentItem = ({ item }) => {
    return (
      <View>
        <BreakSpace></BreakSpace>
        <View style={styles.commentView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: item.userAvatarUrl }}
              style={styles.avatarUser}
            ></Image>
            <Text style={{ fontWeight: "bold" }}>{item.userName}</Text>
            {/* {item.time} */}
            <Text>123</Text>
          </View>
          <View>
            <Text>{item.text}</Text>
          </View>
          <View style={styles.commentButtonBar}>
            <View style={styles.commentButton}>
              <TouchableOpacity>
                <Image
                  style={styles.btnIcon}
                  source={require("../../assets/moreicon.png")}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.commentButton}>
              <TouchableOpacity style={styles.replyView}>
                <Image
                  style={styles.btnIcon}
                  source={require("../../assets/replyicon.png")}
                ></Image>
                <Text style={{ fontWeight: "500" }}>Reply</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.commentButton}>
              <TouchableOpacity>
                <Image
                  style={styles.btnIcon}
                  source={require("../../assets/likeicon.png")}
                ></Image>
              </TouchableOpacity>
              <Text>0</Text>
              <TouchableOpacity>
                <Image
                  style={styles.btnIcon}
                  source={require("../../assets/dislikeicon.png")}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const ListCommentView = ({ listComment }) => {
    return (
      <View style={{ flex: 1 }}>
        {
          comments.map((item, index) => (
            <CommentItem item={item} key={index}></CommentItem>
          ))
          // console.log(comments)
        }
      </View>
    );
  };

  const BreakSpace = () => {
    return (
      <View
        style={{ backgroundColor: "#f1f3f5", height: 10, width: "100vw" }}
      ></View>
    );
  };

  const PostType = () => {
    if (post?.post?.content != null) {
      return (
        <View>
          <Text>{post?.post?.content}</Text>
        </View>
      );
    }
    if (post?.post?.imgUrl != null) {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: post?.post?.imgUrl }}
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
                // maxHeight: 300,
              }}
              source={{
                uri: post?.post?.videoUrl,
              }}
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
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Image
              source={{ uri: post?.communityImgUrl }}
              style={styles.avatarUser}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontWeight: "bold" }}>r/{post?.communityName}</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.postTitle}>{post?.post?.title}</Text>
        </View>

        <View
          style={{
            width: "100%",
            marginTop: 10,
          }}
        >
          <PostType></PostType>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.viewVote}>
              <TouchableOpacity style={styles.upVoteButton}>
                <Image
                  style={styles.btnIcon}
                  source={require("../../assets/likeicon.png")}
                ></Image>
                <Text style={{ paddingLeft: 5, fontWeight: "bold" }}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingLeft: 5, paddingRight: 5 }}>
                <Image
                  style={styles.btnIcon}
                  source={require("../../assets/dislikeicon.png")}
                ></Image>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.commentButton}>
              <Ionicons
                name="chatbox-outline"
                size={20}
                color="black"
                style={{ marginLeft: 5, marginRight: 5 }}
              />
              <Text style={{ fontWeight: "bold" }}>
                {comments.length} Comments
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
        <ListCommentView listComment={comments}></ListCommentView>
      </ScrollView>
      <BreakSpace></BreakSpace>
      <View style={styles.commentFrame}>
        <TextInput
          onChangeText={(newText) => setUserComment(newText)}
          placeholder=" Add a comment"
          style={styles.commentText}
        ></TextInput>
        <TouchableOpacity
          onPress={() => {
            setComments([
              ...comments,
              {
                text: userComment,
                userId: user.id,
                userAvatarUrl: user.avatarUrl,
                userName: user.username,
              },
            ]);
            axios
              .post(ServerUrl + "/api/posts/comments/add", {
                text: userComment,
                userId: user.id,
                postId: post?.post?.id,
              })
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <Ionicons name="send-sharp" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
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
  commentView: {
    flexDirection: "column",
    padding: 10,
  },
  postIntro: {
    flexDirection: "row",
    alignItems: "center",
  },
  postContent: {
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {},
  postButtonBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnIcon: {
    height: 20,
    width: 20,
    marginRight: 5,
    marginLeft: 5,
  },
  postButtonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "32%",
  },
  commentButtonBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  replyView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  commentFrame: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    zIndex: 1,
  },
  commentText: {
    backgroundColor: "#f1f3f5",
    height: 35,
    width: "80%",
    margin: 10,
    borderRadius: 5,
  },
  posticon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#f1f3f5",
  },
});
