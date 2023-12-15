const initialState = {
  user: {
    id: "",
    username: "",
    email: "",
    password: "",
    avatarUrl: "",
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
