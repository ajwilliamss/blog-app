const PostReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CREATE_POST":
      return {
        ...state,
        isLoading: true,
      };
    case "CREATE_POST_SUCCESS":
      return {
        ...state,
        posts: [payload, ...state.posts],
        post: payload,
        isLoading: false,
        isError: false,
      };
    case "CREATE_POST_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default PostReducer;
