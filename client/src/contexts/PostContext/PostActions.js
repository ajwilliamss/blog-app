export const createPost = () => ({
  type: "CREATE_POST",
});

export const createPostSuccess = (post) => ({
  type: "CREATE_POST_SUCCESS",
  payload: post,
});

export const createPostError = () => ({
  type: "CREATE_POST_ERROR",
});
