import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../Features/Board/BoardFormToggleSlice";

export default function Header() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-3 bg-[#00000020] ">
      <span className="font-bold text-4xl">Kanban Board</span>
      <button onClick={() => dispatch(toggle())} className="bg-blue-500 hover:bg-blue-700 text-2xl border-2 border-blue-700 shadow-[1px_1px_5px_2px_rgba(0,0,0,0.2)] hover:shadow-none cursor-pointer rounded-xl w-fit py-1 px-3 text-white">
        Create Board
      </button>
    </div>
  );
}
