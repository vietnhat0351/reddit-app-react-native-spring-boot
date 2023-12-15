import React, { useEffect, useState, useCallback } from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import ServerUrl from "../../../ServerUrl";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default function ChatDetailScreen() {
  const route = useRoute();

  const [user, setUser] = useState(route.params?.user);
  const [receiver, setReceiver] = useState(route.params?.receiver);
  // const [stompClient, setStompClient] = useState();

  const [messages, setMessages] = useState([]);

  const socket = new SockJS(ServerUrl + "/ws");
  const client = Stomp.over(socket);

  useEffect(() => {
    axios
      .post(ServerUrl + "/api/chats/get-chats-with-user", {
        sender: user?.id,
        receiver: receiver?.id,
      })
      .then((response) => {
        setMessages(
          response.data.map((message) => ({
            _id: message.id,
            text: message.content,
            createdAt: new Date(message.createdAt),
            user: {
              _id: message.sender === user?.id ? 1 : 2,
              name: message.sender === user?.id ? "You" : message.senderName,
              avatar:
                message.sender === user?.id
                  ? user.avatarUrl
                  : receiver.avatarUrl,
            },
          }))
        );
      });
  }, []);

  useEffect(() => {
    client.connect({}, function (frame) {
      console.log("Connected: " + frame);
      client.subscribe("/user/" + user?.id + "/topic/messages", (message) => {
        const messageBody = JSON.parse(message.body);
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, {
            _id: messageBody.id,
            text: messageBody.content,
            createdAt: new Date(messageBody.createdAt),
            user: {
              _id: messageBody.sender === user?.id ? 1 : 2,
              name:
                messageBody.sender === user?.id
                  ? "You"
                  : messageBody.senderName,
              avatar:
                messageBody.sender === user?.id
                  ? user.avatarUrl
                  : receiver.avatarUrl,
            },
          })
        );
      });
    });

    // wait for connect to establish then setStompClient
    // setStompClient(client);

    return () => {
      client.disconnect();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    // send message to server
    client.send(
      "/app/sendToUser",
      {},
      JSON.stringify({
        id: messages[0]._id,
        sender: user?.id,
        receiver: receiver?.id,
        content: messages[0].text,
      })
    );
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}
