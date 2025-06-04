import { configureStore } from "@reduxjs/toolkit";
import boardDetailsFunction from "./Features/Board/BoardDetailsSlice";
import boardFormToggleFunction from "./Features/Board/BoardFormToggleSlice";
import boardsArrayReducer from "./Features/Board/BoardsArraySlice";
import oneBoardManageReducer from "./Features/OneBoard/BoardManage";
import oneStageManageReducer from "./Features/OneBoard/StageManage";

console.log("boardDetails : ", boardDetailsFunction)
const store = configureStore({
    reducer: {
        boardDetails : boardDetailsFunction,
        boardFormToggle : boardFormToggleFunction,
        boardsArrayManage : boardsArrayReducer, 
        oneBoardManage: oneBoardManageReducer, 
        oneStageMange: oneStageManageReducer
    }
});

console.log("stageArray from store : ", store.getState());

export default store;

