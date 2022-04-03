import { createContext, useReducer } from "react";
import PostReducer from "./PostReducer";

const initialState = {
  posts: [],
  post: null,
  isLoading: false,
  isError: false,
};

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, initialState);

  return (
    <PostContext.Provider
      value={{
        posts: [state.posts],
        post: state.post,
        isLoading: state.isLoading,
        isError: state.isError,
        dispatch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
