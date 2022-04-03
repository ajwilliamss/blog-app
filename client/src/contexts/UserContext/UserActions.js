export const login = () => ({
  type: "LOGIN",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginError = () => ({
  type: "LOGIN_ERROR",
});

export const logout = () => ({
  type: "LOGOUT",
});

export const update = () => ({
  type: "UPDATE",
});

export const updateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const updateError = () => ({
  type: "UPDATE_ERROR",
});
