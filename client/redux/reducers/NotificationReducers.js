const initialState = {
  notifications: [{ id: 1, message: "Hello" }],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default notificationReducer;
