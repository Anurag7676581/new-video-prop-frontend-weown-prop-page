import { createSlice } from "@reduxjs/toolkit";

const appslice = createSlice({
  name: "app",
  initialState: {
    issidebaropen: false,
    changeNavbar: false,
  },

  reducers: {
    toggleSidebar: (state) => {
      state.issidebaropen = !state.issidebaropen;
    },
    toggleNavbar: (state, action) => {
      state.changeNavbar = action.payload;
    },
  },
});

export const { toggleSidebar, toggleNavbar } = appslice.actions;

export default appslice.reducer;
