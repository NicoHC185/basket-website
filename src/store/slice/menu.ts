import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface CounterState {
  value?: number;
  open: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  open: false,
};

export const menu = createSlice({
  name: "menu",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setMenuEnabled: (state) => {
      state.open = !state.open;
    },
  },
});

export const { setMenuEnabled } = menu.actions;

export default menu.reducer;
