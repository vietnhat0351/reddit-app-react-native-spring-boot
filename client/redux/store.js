import { createStore } from "redux";
import notificationReducer from "./reducers/NotificationReducers";
import userReducer from "./reducers/UserReducers";
import { combineReducers } from "redux";

// const Store = createStore(
//   combineReducers({
//     notificationReducer,
//     userReducer,
//   })
// );

// add all reducers
const Store = createStore(
  combineReducers({
    notificationReducer,
    userReducer,
  })
);

export default Store;
