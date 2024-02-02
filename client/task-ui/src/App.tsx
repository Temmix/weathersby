import React from "react";
import "./App.css";
import { List } from "./components/task/list";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateTask } from "./components/task/create";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/tasks' element={<List />} />
        <Route path='/tasks/create' element={<CreateTask />} />
      </Routes>
    </Router>
  );
}

export default App;
