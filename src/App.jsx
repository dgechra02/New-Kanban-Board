import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Components/Header";
import BoardForm from "./Components/BoardForm";
import Board from "./Components/Board";
import Home from "./Components/Home";
import OpenBoard from "./Components/OpenBoard";

function App() {

  return (
    <>
      <div className="app ">
        <Header />
        <BoardForm />
        <Home />
        
      </div>
    </>
  );
}

export default App;
