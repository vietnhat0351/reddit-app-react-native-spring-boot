import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./components/screens/home-screen/Home";

import CommunityTabScreen from "./components/screens/community-tab-screen/CommunityTabScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./components/MyProfile";
import MenuScreen from "./components/screens/menu-screen/MenuScreen";
import ChatScreen from "./components/screens/chat-screen/ChatScreen";

import InboxScreen from "./components/screens/inbox-screen/InboxScreen";

import FindUserScreen from "./components/screens/find-user-screen/FindUserScreen";
import ChatDetailScreen from "./components/screens/chat-detail-screen/ChatDetailScreen";

import PostComment from "./components/PostComment";
import CreateCommunityScreen from "./components/screens/create-community-screen/CreateCommunityScreen";

import InboxScreenHeader from "./components/headers/InboxScreenHeader";
import CreateScreen from "./components/screens/create-screen/CreateScreen";
import ChooseCommunityScreen from "./components/screens/choose-community-screen/ChooseCommunityScreen";
import UserCommunityScreen from "./components/screens/user-community-screen/UserCommunityScreen";
import { useState } from "react";
import LoginScreen from "./components/screens/login-screen/LoginScreen";
import RegisterScreen from "./components/screens/register-screen/RegisterScreen";

import Store from "./redux/store";
import { useDispatch, useSelector, Provider } from "react-redux";

import {
  addNotification,
  removeNotification,
} from "./redux/actions/NotificationActions";
import { Pressable } from "react-native";

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const CommunityStack = createNativeStackNavigator();
const CreatePostStack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();

const HoneStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        component={Home}
        options={{ header: () => null }}
      />
      <HomeStack.Screen name="ProfileScrenn" component={ProfileScreen} />
      <HomeStack.Screen name="PostComment" component={PostComment} />
      <HomeStack.Screen
        name="MenuStackScreen"
        component={MenuStackScreen}
        options={{ header: () => null }}
      />
    </HomeStack.Navigator>
  );
};

const MenuStackScreen = () => {
  const route = useRoute();
  const [user, setUser] = useState(route.params?.user);

  return (
    <MenuStack.Navigator screenOptions={{ header: () => null }}>
      <MenuStack.Screen
        name="UserCommunityScreen"
        component={UserCommunityScreen}
      />
      <MenuStack.Screen name="MenuScreen" component={MenuScreen} />
      <MenuStack.Screen
        name="CreateCommunityScreen"
        component={CreateCommunityScreen}
      />
    </MenuStack.Navigator>
  );
};

const CommunityStackScreen = () => {
  return (
    <CommunityStack.Navigator>
      <CommunityStack.Screen
        name="CommunityScreen"
        component={CommunityTabScreen}
        options={{
          header: () => null,
        }}
      />
      <CommunityStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <CommunityStack.Screen
        name="MenuStackScreen"
        component={MenuStackScreen}
        options={{ header: () => null }}
      />
    </CommunityStack.Navigator>
  );
};

function ChatScreenStack() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatStack"
        component={ChatScreen}
        // options={{ header: () => <ChatScreenHeader title="Chats" /> }}
        options={{ header: () => null }}
      />
      <ChatStack.Screen name="ProfileScrenn" component={ProfileScreen} />
      <ChatStack.Screen
        name="MenuStackScreen"
        component={MenuStackScreen}
        options={{ header: () => null }}
      />
      <ChatStack.Screen name="FindUserScreen" component={FindUserScreen} />
      <ChatStack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
    </ChatStack.Navigator>
  );
}

function InboxScreenStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="InboxStack"
        component={InboxScreen}
        options={{ header: () => <InboxScreenHeader title="Inbox" /> }}
      />
      <HomeStack.Screen name="ProfileScrenn" component={ProfileScreen} />
      <HomeStack.Screen
        name="MenuStackScreen"
        component={MenuStackScreen}
        options={{ header: () => null }}
      />
    </HomeStack.Navigator>
  );
}

function CreateScreenStack() {
  return (
    <CreatePostStack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <CreatePostStack.Screen name="CreateScreen" component={CreateScreen} />
      <CreatePostStack.Screen
        name="ChooseCommunityScreen"
        component={ChooseCommunityScreen}
      />
    </CreatePostStack.Navigator>
  );
}

const MenuTab = ({ navigation }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notificationReducer.notifications
  );
  const [numberNotifications, setNumberNotifications] = useState(
    notifications.length
  );

  // useEffect(() => {
  //   setNumberNotifications(0);
  //   return () => {
  //     console.log("Screen blurred");
  //   };
  // }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Communities") {
            iconName = focused ? "people-circle" : "people-circle-outline";
          } else if (route.name === "Create") {
            iconName = "add";
          } else if (route.name === "Chat") {
            iconName = focused
              ? "chatbubble-ellipses"
              : "chatbubble-ellipses-outline";
          } else if (route.name === "Inbox") {
            iconName = focused ? "notifications" : "notifications-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // headerShown: false,
        header: () => null,
        tabBarStyle: {
          display: route.name === "Create" ? "none" : "flex",
        },
      })}
    >
      <Tab.Screen name="Home" component={HoneStackScreen}></Tab.Screen>
      <Tab.Screen
        name="Communities"
        component={CommunityStackScreen}
      ></Tab.Screen>
      <Tab.Screen name="Create" component={CreateScreenStack}></Tab.Screen>
      <Tab.Screen name="Chat" component={ChatScreenStack}></Tab.Screen>
      <Tab.Screen
        name="Inbox"
        component={InboxScreenStack}
        options={{
          tabBarBadge: numberNotifications > 0 ? numberNotifications : null,
          //set Number of notifications = 0 when click on tab
          tabBarButton: (props) => {
            return (
              <Pressable
                {...props}
                onPress={() => {
                  setNumberNotifications(0);
                  navigation.navigate("Inbox");
                }}
              />
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <AppStack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            header: () => null,
          }}
        >
          <AppStack.Screen name="LoginScreen" component={LoginScreen} />
          <AppStack.Screen name="RegisterScreen" component={RegisterScreen} />
          <AppStack.Screen name="MenuTab" component={MenuTab} />
        </AppStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
