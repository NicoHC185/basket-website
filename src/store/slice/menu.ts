import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface CounterState {
  value?: number;
  open: boolean;
  drawerOpen: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  open: false,
  drawerOpen: false,
};

export const menu = createSlice({
  name: "menu",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setMenuEnabled: (state) => {
      state.open = !state.open;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload;
    },
  },
});

export const { setMenuEnabled, openDrawer } = menu.actions;

export default menu.reducer;
