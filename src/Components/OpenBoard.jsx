import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { stageToggle } from "../Features/OneBoard/BoardManage";
import {
  addStage,
  addTask,
  taskToggle,
  setTitle,
  setDesc,
  setCreatedBy,
  getSavedStagesArray,
  countStage,
  setStageName,
  removeStage,
  moveItemsTo,
  movableData,
} from "../Features/OneBoard/StageManage";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import cross from "../assets/cross.svg";

export default function OpenBoard() {
  const { boardId: myBoardId = "" } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSavedStagesArray(myBoardId));
    return () => {};
  }, []);
  const navigate = useNavigate();

  const boardsArray = useSelector(
    (store) => store.boardsArrayManage.boardsArray
  );
  const myBoard = boardsArray.find((b) => b.boardId === myBoardId);

  const { name, color } = myBoard;
  const stageIsFormOpen = useSelector(
    (store) => store.oneBoardManage.stageFormIsOpen
  );
  const stageArray = useSelector((store) => store.oneStageMange.stageArray);

  useEffect(
    () =>
      localStorage.setItem(
        `stageArray${myBoardId}`,
        JSON.stringify(stageArray)
      ),
    [stageArray]
  );
  return (
    <div style={{ backgroundColor: color + "15" }} className="min-h-dvh ">
      <BoardHeader name={name} />
      <div className="boardContent p-1 m-1">
        <div className="stages flex max-md:justify-center flex-wrap gap-2">
          {stageArray.map((details, index) => (
            <StageBox key={index} details={details} color={color} />
          ))}
          <div
            onClick={() => dispatch(stageToggle())}
            style={{ borderColor: color }}
            className="w-5 h-[65dvh] md:h-[87dvh] border-2 flex items-center justify-center cursor-pointer bg-white"
          >
            +
          </div>
          {stageIsFormOpen && (
            <div
              onClick={() => dispatch(stageToggle())}
              className="w-screen h-screen bg-[#00000050] fixed top-0 left-0 flex justify-center items-center z-10"
            >
              <StageForm myBoardId={myBoardId} />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        style={{ borderColor: color }}
        className="fixed bottom-2 right-2 px-2 py-1 border-2 shadow-2xl bg-white rounded cursor-pointer"
      >
        Back
      </button>
    </div>
  );
}

function BoardHeader({ name }) {
  return (
    <div className="flex flex-col justify-center items-center p-2">
      <div className="font-semibold text-2xl text-center">{name}</div>
      <span>{`(Click on vertical (+) bar to add stages)`}</span>
    </div>
  );
}

function TaskBox({ task}) {
  const { title, desc, createdBy} = task;
  const dispatch = useDispatch();
  function handleDrag(task){
    console.log("draging from : ", task);
    dispatch(movableData(task));
  }
  return (
    <div
      draggable
      // onDragOver={ e => e.stopPropagation()} // prevent the reaction when item is upon another item
      // by default it don't allow to drop the item, so we use preventDefault()
      onDragStart={ (e) => handleDrag(task)}
      className="tasks flex flex-col m-2 px-2 py-1 shadow-[0px_0px_5px_0px_rgb(0,0,0)] rounded"
    >
      <span className="font-semibold truncate">{title}</span>
      <span className="line-clamp-2">{desc}</span>
      <span className="truncate">{createdBy}</span>
    </div>
  );
}

function StageBox({ details, color }) {
  const dispatch = useDispatch();
  const { id, stageName, taskArray, taskFormIsOpen } = details;

  function handleDrop(stageId) {
    console.log("dropping on : ", stageId );
    dispatch(moveItemsTo(stageId));
  }
  return (
    <div
      id={id}
      style={{ borderColor: color }}
      className="stage border-2  w-[300px] h-[65dvh] md:h-[87dvh] bg-white"
      onDragOver={ e => e.preventDefault()} // by default it don't allow to drop the item, so we use preventDefault()
      onDrop={(e) => handleDrop(id)}
    //   onDragEnter={ () => console.log("onEnter", id)}
    //   onDragLeave={ () => console.log("onLeave", id)}
    >
      <div className="stageHeader flex justify-between border p-1 m-1">
        <span className="font-bold text-xl w-[250px] truncate">{stageName}</span>
        <div className="flex gap-1 justify-center items-center max-w-12 ">
          <span>
            <img
              onClick={() => dispatch(removeStage(id))}
              src={cross}
              alt="cross-img"
              className="w-5 cursor-pointer"
            />
          </span>
          <span
            onClick={(e) => {
              dispatch(taskToggle(id));
              e.stopPropagation();
            }}
            className=" flex justify-center items-center shadow-[0px_0px_2px_0px_rgba(0,0,0)] rounded w-5 leading-none pb-[3px] cursor-pointer"
          >
            +
          </span>
        </div>
      </div>
      <div className="content h-[90%] overflow-auto">
        {taskArray.map((task, index) => (
          <TaskBox key={index} task={task} />
        ))}
      </div>
      {taskFormIsOpen && (
        <div
          onClick={() => dispatch(taskToggle(id))}
          className="flex justify-center items-center taskFrom w-screen h-screen bg-[#00000050] fixed top-0 left-0"
        >
          <TaskForm stageId={id} />
        </div>
      )}
    </div>
  );
}

function TaskForm({ stageId }) {
  const title = useSelector((store) => store.oneStageMange.title);
  const desc = useSelector((store) => store.oneStageMange.desc);
  const createdBy = useSelector((store) => store.oneStageMange.createdBy);

  const dispatch = useDispatch();

  function handleTaskSubmit() {
    dispatch(addTask({ taskId: nanoid(), title, desc, createdBy, stageId }));
    dispatch(setTitle(""));
    dispatch(setDesc(""));
    dispatch(setCreatedBy(""));
    dispatch(taskToggle(stageId));
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" bg-white w-[400px] rounded px-3 py-2 max-md:m-2"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleTaskSubmit();
        }}
        action=""
        className="flex flex-col gap-2"
      >
        <span className="text-center font-semibold text-lg">New Task</span>
        <input
          type="text"
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          className="border rounded pl-2 h-9"
          placeholder="title"
          required
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => dispatch(setDesc(e.target.value))}
          className="border rounded pl-2 h-9"
          placeholder="description"
          required
        />
        <input
          type="text"
          value={createdBy}
          onChange={(e) => dispatch(setCreatedBy(e.target.value))}
          className="border rounded pl-2 h-9"
          placeholder="created by..."
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-lg border-2 border-green-600 cursor-pointer rounded py-1 px-3 text-white"
        >
          Add task
        </button>
      </form>
    </div>
  );
}

function StageForm({ myBoardId }) {
  const dispatch = useDispatch();
  const countStages = useSelector((store) => store.oneStageMange.countStage);
  const stageName = useSelector((store) => store.oneStageMange.stageName);
  const stagearray = useSelector((store) => store.oneStageMange.stageArray);
  function handleStageSubmit() {
    dispatch(
    //   addStage({ stageName: stageName || `Stage${countStages + 1}`, myBoardId }) // apply it later
      addStage({ stageName: stageName})
    );
    dispatch(stageToggle());
    dispatch(countStage());
    dispatch(setStageName(""));
    console.log("stageArray : ", stagearray);
  }
  return (
    <div onClick={(e) => e.stopPropagation()} className="w-[400px] bg-white m-2 rounded">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleStageSubmit();
        }}
        className="flex flex-col gap-2 p-2 "
      >
        <span className="text-center font-semibold text-lg">New Stage</span>
        <input
          value={stageName}
          onChange={(e) => dispatch(setStageName(e.target.value))}
          type="text"
          placeholder="Stage name"
          className="border rounded pl-2 h-9"
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-lg border-2 border-green-600 cursor-pointer rounded py-1 px-3 text-white"
        >
          Add Stage
        </button>
      </form>
    </div>
  );
}
