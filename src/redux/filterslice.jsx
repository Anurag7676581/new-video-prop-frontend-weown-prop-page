import { createSlice } from "@reduxjs/toolkit";

const filterslice = createSlice({
  name: "filters",
  initialState: {
    appliedfilters: [],
    priceRange: [0, 60000000],
    city: "",
  },
  reducers: {
    setFilters: (state, action) => {
      if (action.payload.type === "appliedFilters") {
        if (!state.appliedfilters.includes(action.payload.value)) {
          state.appliedfilters.push(action.payload.value);
        }
      } else state[action.payload.type] = action.payload.value;
      console.log("redux ok");
    },

    removeFilters: (state, action) => {
      if (action.payload.type === "appliedFilters")
        state.appliedfilters = state.appliedfilters.filter(
          (filter) => filter !== action.payload
        );
      else if (action.payload.type === "city") state[action.payload.type] = "";
      else state.priceRange = [0, 60000000];
    },

    clearFilters: (state) => {
      state.appliedfilters = [];
      state.city = "";
      state.priceRange = [0, 60000000];
    },
  },
});

export const { setFilters, removeFilters, clearFilters } = filterslice.actions;

export default filterslice.reducer;
