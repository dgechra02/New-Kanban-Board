import { createSlice } from "@reduxjs/toolkit";

const boardManageSlice = createSlice({
  name: "boardManage",
  initialState: {
    stageFormIsOpen: false,
  },
  reducers: {
    stageToggle: (state) => {
      state.stageFormIsOpen = !state.stageFormIsOpen;
    },
  },
});

export const { stageToggle } = boardManageSlice.actions;
export default boardManageSlice.reducer;
