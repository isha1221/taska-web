import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import ProfilePage from "./pages/profilePage/ProfilePage";
import FriendList from "./pages/friendListPage/friend_list";
import { LoginForm } from "./pages/loginPage/login";
import { SignupForm } from "./pages/signupPage/signupForm";
import Task from "./pages/taskPage/Task";
import Navbar from "./components/Navbar/navbar";
import Dashboard from "./pages/dashboard/dashboard";
import HomeLayout from "./layouts/homeLayout/homeLayout";
import Flame from "./components/flame/flame";
import LeaderBoard from "./pages/leaderboard/leaderBoard";
import TaskDescription from "./pages/taskDescription/taskDescription";
import Home from "./pages/home/home";
import DragCard from "./components/dragableCard/dragCard";
import TaskImage from "./components/task_img_component/taskImage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/app" element={<HomeLayout></HomeLayout>}>
          <Route path="task" element={<Task />} index />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="friends" element={<FriendList />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leaderboard" element={<LeaderBoard />} />
          <Route
            path="taskDescription/:taskId"
            element={<TaskDescription></TaskDescription>}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>

    // <TaskDescription></TaskDescription>
  );
}

export default App;
