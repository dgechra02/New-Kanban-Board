import { useNavigate } from "react-router";
import cross from "../assets/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromArray } from "../Features/Board/BoardsArraySlice";
import { removeStageArray } from "../Features/OneBoard/StageManage";
export default function Board({ boardDetails }) {
  const { name, desc, color, boardId } = boardDetails;
  console.log("boardsDetails : ", boardDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boardArray = useSelector((store) => store.boardsArrayManage.boardsArray);
  console.log("boardArray from comp : ", boardArray)

  function handleRemoveBoard(boardId) {
    dispatch(removeItemFromArray({ boardId, boardArray }));
    dispatch(removeStageArray(boardId));
  }
  return (
    <div
      onClick={() => navigate(`/boards/${boardId}`)}
      style={{ borderColor: color }}
      className="flex flex-col border-3 w-[350px] max-h-40 rounded-xl overflow-hidden cursor-pointer relative"
    >
      <button className="absolute top-[2px] right-[2px] leading-none p-0">
        <img
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveBoard(boardId);
          }}
          src={cross}
          alt="cross-icon"
          className="cursor-pointer w-4 m-0"
        />
      </button>
      <span style={{ backgroundColor: color }} className="h-5 w-full"></span>
      <span className="font-semibold text-xl px-2 bg-white truncate">{name}</span>
      <span className=" p-2 pt-0 bg-white leading-5 line-clamp-3">{desc}</span>
    </div>
  );
}
