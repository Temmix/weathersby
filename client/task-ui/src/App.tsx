import "./App.css";
import { List } from "./components/task/list";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateTask } from "./components/task/create";
import { UpdateTask } from "./components/task/update";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/tasks/:id' element={<UpdateTask />} />
        <Route path='/tasks/create' element={<CreateTask />} />
      </Routes>
    </Router>
  );
}

export default App;
