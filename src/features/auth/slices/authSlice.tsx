import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../types/AuthState";
import storage from "../../../utils/storage";
import { loginApi } from "../api/loginApi";

const initialState: AuthState = {
  token: storage.getToken() || null,
  username: storage.getUsername() || null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.username = null;
      storage.clearToken();
      storage.clearUsername();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      loginApi.endpoints.login.matchFulfilled,
      (state, { payload, meta }) => {
        const { token } = payload;
        state.token = token;
        storage.setToken(token);

        const requestBody = meta.arg.originalArgs;
        if (requestBody?.username) {
          state.username = requestBody.username;
          storage.setUsername(requestBody.username);
        }
      }
    );
  },
});

export const { logout } = slice.actions;

export default slice.reducer;
