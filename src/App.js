import { useState, useRef, useCallback } from "react"; // eslint-disable-line no-unused-vars
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoApp from "./pages/bomvomsss/index";
import TodoApp02 from "./pages/hyennnnnn/index";
import Gaha from "./pages/gaha/index";
import ChocoMain from "./pages/chocochococho/ChocoMain";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bomvomsss" element={<TodoApp />}/>
        <Route path="/hyennnnnn" element={<TodoApp02 />}/>
        <Route path="/gaha" element={<Gaha/>}/>
        <Route path="/chocochococho" element={<ChocoMain/>}/>
      </Routes>
      <div className="viewWrap">
        <div className="todoWrap">
          
        </div>
        <div className="doneWrap">

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;