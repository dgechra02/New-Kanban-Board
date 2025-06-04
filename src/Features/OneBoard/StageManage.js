import { createSlice, nanoid } from "@reduxjs/toolkit";

const StageManageSlice = createSlice({
  name: "stageManage",
  initialState: {
    countStage: 0,
    stageName: "",
    stageArray: [],
    movableData: {},
    title: "",
    desc: "",
    createdBy: "",
  },
  reducers: {
    getSavedStagesArray: (state, action) => {
      const boardId = action.payload;
      state.stageArray =
        JSON.parse(localStorage.getItem(`stageArray${boardId}`)) || [];
    },
    removeStageArray: (state, action) => {
      const boardId = action.payload;
      localStorage.removeItem(`stageArray${boardId}`);
    },
    countStage: (state) => {
      state.countStage = state.countStage + 1;
    },
    setStageName: (state, action) => {
      state.stageName = action.payload;
    },
    taskToggle: (state, action) => {
      const stageId = action.payload;
      console.log("stageId from taskToggle : ", stageId);
      state.stageArray.find(
        (s) =>
          s.id === stageId &&
          (s.taskFormIsOpen === true
            ? (s.taskFormIsOpen = false)
            : (s.taskFormIsOpen = true))
      );
    },

    addStage: (state, action) => {
      const { stageName, myBoardId } = action.payload;
      state.stageArray.push({
        id: nanoid(),
        stageName: stageName,
        taskArray: [],
        taskFormIsOpen: false,
      });
      //   localStorage.setItem(`stageArray${myBoardId}`, JSON.stringify(state.stageArray))
    },
    removeStage: (state, action) => {
      const removeStageId = action.payload;
      state.stageArray = state.stageArray.filter((s) => s.id !== removeStageId);
    },
    addTask: (state, action) => {
      const { taskId, title, desc, createdBy, stageId } = action.payload;
      console.log("taskId, stageId : : ", taskId, stageId);
      state.stageArray.find((stage) =>
        stage.id === stageId
          ? stage.taskArray.push({ taskId, title, desc, createdBy, stageId })
          : null
      );
      // state or state.taskArray etc. : it returns a proxy object it 'find' finds something otherwise it will return undefined
    },
    moveItemsTo: (state, { payload: stageId }) => {
      const task = state.movableData; 
      if (task.stageId === stageId)
        return; // do thing, cause dropping on the same stage
      else {
        // removed from the stage
        state.stageArray.find(
          (s) =>
            task.stageId === s.id &&
            (s.taskArray = s.taskArray.filter((t) => t.taskId !== task.taskId)) // assign to taskArray after filtering, otherwise it won't reflect
        );
        // added to the target stage
        state.stageArray.find(
          (s) =>
            stageId === s.id &&
            (task.stageId = stageId, s.taskArray.push(task))
        );
      }
    },
    movableData: (state, action) => {
      state.movableData = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDesc: (state, action) => {
      state.desc = action.payload;
    },
    setCreatedBy: (state, action) => {
      state.createdBy = action.payload;
    },
  },
});
console.log("initialState : ", StageManageSlice.getInitialState());
export const {
  getSavedStagesArray,
  removeStageArray,
  countStage,
  setStageName,
  taskToggle,
  addStage,
  removeStage,
  addTask,
  moveItemsTo,
  movableData,
  setTitle,
  setDesc,
  setCreatedBy,
} = StageManageSlice.actions;
export default StageManageSlice.reducer;