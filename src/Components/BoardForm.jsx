import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setColor,
  setDesc,
  setName,
} from "../Features/Board/BoardDetailsSlice";
import { toggle } from "../Features/Board/BoardFormToggleSlice";
import { addItemInArray } from "../Features/Board/BoardsArraySlice";
import { nanoid } from "@reduxjs/toolkit";

export default function BoardForm() {
  const color = useSelector((store) => store.boardDetails.color);
  const name = useSelector((store) => store.boardDetails.name);
  const desc = useSelector((store) => store.boardDetails.desc);
  const formIsOpen = useSelector((store) => store.boardFormToggle);
  const boardsArray = useSelector((store) => store.boardsArrayManage.boardsArray);

  // const boardsArray = useSelector((store) => store.boardsArray);
  console.log("formIsOpen : ", formIsOpen);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    // this is a synthatic event
    e.preventDefault();
    dispatch(addItemInArray({ name, desc, color, boardId: nanoid() }));
    dispatch(toggle());
    dispatch(setName(""));
    dispatch(setDesc(""));
    dispatch(setColor("#000000"));
  }
  useEffect(
    () => localStorage.setItem("boardsArray", JSON.stringify(boardsArray)),
    [boardsArray]
  );
  return (
    <>
      {formIsOpen && (
        <div
          onClick={() => {
            dispatch(toggle());
            dispatch(setName(""));
            dispatch(setDesc(""));
          }}
          className="flex justify-center items-center w-screen h-screen bg-[#00000050] fixed top-0 z-10"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="w-[400px] h-fit rounded-2xl shadow-[2px_2px_15px_0px_rgba(0,0,0,0.8)] p-4 flex flex-col gap-3 text-[18px] bg-white"
          >
            <span className="text-center text-2xl font-semibold">
              New Board
            </span>
            <label htmlFor="title" className="flex flex-col">
              Form Title*
              <input
                id="title"
                type="text"
                value={name}
                onChange={(e) => dispatch(setName(e.target.value))}
                className="border-2 px-2 h-9 rounded"
                required
              />
            </label>
            <label htmlFor="description" className="flex flex-col">
              Form Description*
              <input
                id="description"
                type="text"
                value={desc}
                onChange={(e) => dispatch(setDesc(e.target.value))}
                className="border-2 px-2 h-9 rounded"
                required
              />
            </label>

            <span className="flex items-center w-fit">
              <label htmlFor="color">Pick color</label>
              <input
                id="color"
                type="color"
                value={color}
                onChange={(e) => dispatch(setColor(e.target.value))}
                className="w-12 h-7 border-1 rounded p-1 mx-2 cursor-pointer"
              />
              <span>{color}</span>
            </span>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-xl border-2 border-green-600 cursor-pointer rounded py-1 px-3 text-white"
            >
              Add Board
            </button>
          </form>
        </div>
      )}
    </>
  );
}
