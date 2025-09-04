import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import TaskList from "./pages/task-list/TaskList";
import CreateTask from "./pages/create-task/CreateTask";
import { useEffect, useState } from "react";


function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <NavBar currentUser={currentUser} setCurrentUser={(user) => setCurrentUser(user)} />
        <Routes>
          <Route path="/Register" element={<Register />} />
          {/* <Route
            path="/"
            element={<Login setCurrentUser={(user) => setCurrentUser(user)} />}
          /> */}
          <Route path="/" element={<Login setCurrentUser={(user) => setCurrentUser(user)} />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/edit-task/:id" element={<CreateTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
