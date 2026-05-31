import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user_id: null,
    token: null,
    role: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,

    propertiesViewed: [],

  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.user_id = action.payload.id;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.firstName = action.payload.fname;
      state.lastName = action.payload.lname;
      state.phoneNumber = action.payload.phoneNumber;
    },
    setLogOut: (state) => {
      state.isLoggedIn = false;
      state.user_id = null;
      state.token = null;
      state.role = null;
      state.firstName = null;
      state.lastName = null;
      state.phoneNumber = null;

    },
    setPropertiesViewed: (state, action) => {
      if (!state.propertiesViewed.includes(action.payload)) {
        state.propertiesViewed.push(action.payload);
      }

    },
  },
});

export const { setLoggedIn, setLogOut, setPropertiesViewed } =
  userSlice.actions;

export default userSlice.reducer;
