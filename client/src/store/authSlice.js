import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
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
  },
});

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
