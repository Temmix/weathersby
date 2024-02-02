import React from "react";
import "./App.css";
import { List } from "./components/task/list";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Item } from "./components/task/item";
//import { Route } from "react-router";
import { View } from "./components/task/view";
import { CreateTask } from "./components/task/create";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/tasks' element={<List />} />
        <Route path='/tasks/create' element={<CreateTask />} />
        <Route path='/tasks/:id' element={<Item />} />
        <Route path='/tasks/:id' element={<View />} />
      </Routes>
    </Router>
  );
}

export default App;
