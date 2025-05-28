import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  csrfToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    resetUser: (state, _) => {
      state.user = null;
    },

    setCsrfToken: (state, action) => {
      state.csrfToken = action.payload;
    },
  },
});

export const { setUser, resetUser, setCsrfToken } = authSlice.actions;

export default authSlice.reducer;
