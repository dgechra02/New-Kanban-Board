import { createSlice } from "@reduxjs/toolkit";
const savedBoardsArray = JSON.parse(localStorage.getItem("boardsArray")) || []; 
const boardsArraySlice = createSlice({
  name: "boardsArray",
  initialState: {boardsArray : savedBoardsArray},
  reducers: {
    addItemInArray: (state, action) => {
      state.boardsArray.push(action.payload);
    },
    removeItemFromArray: (state, action) => {
        const {boardId:removeBoardId, boardArray} = action.payload; 
        console.log("boardArray from slice: ", boardArray);
        state.boardsArray = state.boardsArray.filter( board => board.boardId !== removeBoardId);
        console.log("board array after : ",boardArray);
    }
  },
});
export const { addItemInArray, removeItemFromArray } = boardsArraySlice.actions;
export default boardsArraySlice.reducer;
