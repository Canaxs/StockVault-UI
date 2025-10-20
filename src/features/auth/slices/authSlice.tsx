import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../types/AuthState";
import storage from "../../../utils/storage";
import { loginApi } from "../api/loginApi";

const initialState: AuthState = {
  token: storage.getToken() || null,
  username: storage.getUsername() || null,
  roles: storage.getRoles() || null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.roles = null;
      storage.clearToken();
      storage.clearUsername();
      storage.clearRoles();
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        loginApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          const { token } = payload;
          state.token = token;
          storage.setToken(token);
        }
      )
      .addMatcher(
        loginApi.endpoints.GetClaims.matchFulfilled,
        (state, { payload }) => {
          const { username, roles } = payload;
          state.username = username;
          state.roles = roles;
          storage.setUsername(username);
          storage.setRoles(roles);
        }
      );
  },
});

export const { logout } = slice.actions;

export default slice.reducer;
