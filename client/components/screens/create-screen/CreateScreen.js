import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import * as Progress from "react-native-progress";
import { firebase } from "./firebaseConfig";
import { Video } from "expo-av";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { Button } from "react-native";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;

export default function CreateScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const user = useSelector((state) => state.userReducer.user);

  const [community, setCommunity] = useState({});

  const [uploadProgress, setUploadProgress] = useState(0);
  const [postType, setPostType] = useState("text");
  const [image, setImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  // const video = useRef(null);
  const [status, setStatus] = useState({});
  const [bodyText, setBodyText] = useState("");
  const [title, setTitle] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  // const [videoUrl, setVideoUrl] = useState("");

  // const count = useRef(0);

  // useEffect(() => {
  //   count.current = count.current + 1;
  //   console.log(count.current);
  // });

  // set community
  useEffect(() => {
    if (route.params?.community) {
      setCommunity(route.params?.community);
      console.log(route.params?.community);
    }
  }, [route.params?.community]);

  const resetScreen = () => {
    setPostType("text");
    setImage(null);
    setSelectedVideo(null);
    setImage(null);
    setBodyText("");
    setTitle("");
  };

  const uploadVideo = async () => {
    try {
      const response = await fetch(selectedVideo);
      const blob = await response.blob();

      const storageRef = firebase
        .storage()
        .ref()
        .child("videos/" + new Date().getTime());
      const uploadTask = storageRef.put(blob);

      // Tạo một Promise để theo dõi sự kiện state_changed
      const uploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            reject(error);
          },
          () => {
            resolve(uploadTask.snapshot.ref.getDownloadURL());
          }
        );
      });

      // Sử dụng await để đợi cho Promise hoàn thành
      const downloadURL = await uploadPromise;
      console.log("File available at", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading video:", error);
      throw error; // Re-throw lỗi để nó có thể được xử lý bởi hàm gọi
    }
  };

  const SaveImagePost = async () => {
    try {
      // Gọi uploadImage và đợi cho nó hoàn thành trước khi tiếp tục
      const imageUrl = await uploadImage();

      // Sau khi có imageUrl, tiếp tục với việc gửi POST request
      const response = await axios.post(
        ServerUrl + "/api/posts/create/image-post",
        {
          userId: user.id,
          communityId: community.id,
          imageUrl: imageUrl,
          title: title,
        }
      );

      console.log(response.data);
      navigation.navigate("Home", {
        screen: "HomeStack",
        params: {
          reload: {
            // userId: user.id,
            // communityId: community.id,
            // content: bodyText,
            // title: title,
          },
        },
      });
    } catch (error) {
      console.error("Error saving image post:", error);
    }
  };

  const SaveVideoPost = async () => {
    try {
      // Gọi uploadVideo và đợi cho nó hoàn thành trước khi tiếp tục
      const videoUrl = await uploadVideo();

      // Sau khi có videoUrl, tiếp tục với việc gửi POST request
      const response = await axios.post(
        ServerUrl + "/api/posts/create/video-post",
        {
          userId: user.id,
          communityId: community.id,
          videoUrl: videoUrl,
          title: title,
        }
      );

      console.log(response.data);
      navigation.navigate("Home", {
        screen: "HomeStack",
        params: {
          reload: {
            // userId: user.id,
            // communityId: community.id,
            // content: bodyText,
            // title: title,
          },
        },
      });
    } catch (error) {
      console.error("Error saving video post:", error);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const storageRef = firebase
        .storage()
        .ref()
        .child("images/" + new Date().getTime());
      const uploadTask = storageRef.put(blob);

      // Tạo một Promise để theo dõi sự kiện state_changed
      const uploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            reject(error);
          },
          () => {
            resolve(uploadTask.snapshot.ref.getDownloadURL());
          }
        );
      });

      // Sử dụng await để đợi cho Promise hoàn thành
      const downloadURL = await uploadPromise;
      console.log("File available at", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Re-throw lỗi để nó có thể được xử lý bởi hàm gọi
    }
  };

  function CreateScreenHeader(callback) {
    return (
      <View
        style={{
          height: 70,
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              callback();
              navigation.navigate("Home");
            }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
            Create Post
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Button
            title="Post"
            style={{ backgroundColor: "#5cdb5c", borderRadius: 15, padding: 5 }}
            onPress={() => {
              if (postType == "text") {
                console.log("text");
                console.log(community.id);
                console.log(user.id);
                axios
                  .post(ServerUrl + "/api/posts/create/text-post", {
                    userId: user.id,
                    communityId: community.id,
                    content: bodyText,
                    title: title,
                  })
                  .then((response) => {
                    console.log(response.data);
                    navigation.navigate("Home", {
                      screen: "HomeStack",
                      params: {
                        reload: {
                          userId: user.id,
                          communityId: community.id,
                          content: bodyText,
                          title: title,
                        },
                      },
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
              if (postType == "image") {
                // console.log("image");
                SaveImagePost();
              }
              if (postType == "video") {
                console.log("video");
                SaveVideoPost();
              }
              // resetScreen();
            }}
          ></Button>
        </View>
      </View>
    );
  }

  const pickVideo = async () => {
    setPostType("video");
    setImage(null);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    if (!result.canceled) {
      setSelectedVideo(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    setPostType("image");
    setSelectedVideo(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // useEffect(() => {
  //   setUploadProgress(0);
  // }, [image]);

  const ImageView = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {/* {image && (

        )} */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: image }}
              style={{ width: 350, height: 450 }}
            />
          </View>

          {uploadProgress > 0 && (
            <View>
              <Progress.Bar
                size={100}
                progress={uploadProgress / 100}
                showsText
                formatText={() => `${uploadProgress.toFixed(2)}%`}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  const VieoView = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Video
          // ref={video}
          style={{ flex: 1, alignSelf: "stretch", width: 350, height: 450 }}
          source={{ uri: selectedVideo }}
          useNativeControls
          resizeMode="contain"
          isLooping
          // onPlaybackStatusUpdate={setStatus}
        />
      </View>
    );
  };

  const TextView = (callback) => {
    return (
      <TextInput
        style={{
          fontSize: 20,
          marginTop: 10,
        }}
        placeholder="body text"
        onChangeText={(text) => callback(text)}
        multiline={true}
      />
    );
  };

  const PostTypeInput = (callback) => {
    if (postType === "text") {
      return TextView(callback);
    } else if (postType === "image") {
      return <ImageView />;
    } else {
      return <VieoView />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {CreateScreenHeader(resetScreen)}
      <ScrollView
        style={{
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <View style={{ flex: 3 }}>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                paddingBottom: 10,
                marginBottom: 5,
              }}
            >
              <View style={{ flex: 7, flexDirection: "row" }}>
                <Text style={{ fontSize: 20 }}>Post to:</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: community.imageUrl }}
                    style={{ width: 30, height: 30, borderRadius: 15 }}
                  />
                  <Text style={{ fontSize: 15 }}>r/{community.name}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 3,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ChooseCommunityScreen", {
                      user: user,
                    });
                    // console.log(user);
                  }}
                >
                  <Feather name="search" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <TextInput
              style={{
                fontWeight: "bold",
                fontSize: 25,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                paddingBottom: 10,
                marginTop: 5,
              }}
              placeholder="Title"
              onChangeText={(text) => setTitle(text)}
              multiline={true}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setPostType("text");
                  setImage(null);
                  setSelectedVideo(null);
                }}
              >
                <Entypo name="text" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 20 }} onPress={pickImage}>
                <Entypo name="image" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 20 }} onPress={pickVideo}>
                <Entypo name="video" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {PostTypeInput(setBodyText)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
});
