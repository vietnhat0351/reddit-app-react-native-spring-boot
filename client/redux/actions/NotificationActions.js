export const addNotification = (notification) => {
  return {
    type: "ADD_NOTIFICATION",
    payload: notification,
  };
};

export const removeNotification = (notificationId) => {
  return {
    type: "REMOVE_NOTIFICATION",
    payload: notificationId,
  };
};
