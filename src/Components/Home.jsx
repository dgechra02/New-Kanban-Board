import React from 'react'
import { useSelector } from 'react-redux'
import Board from './Board';

export default function Home() {
  
  const boardsArray = useSelector((store) => store.boardsArrayManage.boardsArray); 
  console.log("boardsArray from home : ", boardsArray); 
  

  return (
    <div className='flex justify-center flex-wrap w-4/5 m-auto gap-5 p-5'>
      {boardsArray.map((boardDetails, index) => <Board key={index} boardDetails={boardDetails} />)}
    </div>
  )
}
