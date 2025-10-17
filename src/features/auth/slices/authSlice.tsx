import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../types/AuthState";
import storage from "../../../utils/storage";
import { loginApi } from "../api/loginApi";

const initialState: AuthState = {
  token: storage.getToken() || null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      storage.clearToken();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      loginApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const { token } = payload;
        state.token = token;
        storage.setToken(token);
      }
    );
  },
});

export const { logout } = slice.actions;

export default slice.reducer;
