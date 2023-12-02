// redux/reducers/userReducer.js
"use client";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    username: "",
    email: "",
    token: "",
    // ... other user properties
  },
  reducers: {
    setUser: (state, action) => {
      const { id, username, email, token } = action.payload;
      return {
        ...state,
        id,
        username,
        email,
        token,
        // ... update other user properties as needed
      };
    },
    // Add more reducer actions as needed
    resetUser: (state) => {
      return {
        id: null,
        username: "",
        email: "",
        token: "",
        // ... reset other user properties if needed
      };
    },
  },
});

export const { actions, reducer } = userSlice;
