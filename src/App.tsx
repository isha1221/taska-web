import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProfilePage from "./pages/profilePage/ProfilePage";
import FriendList from "./pages/friendListPage/friend_list";
import { LoginForm } from "./pages/loginPage/login";
import { SignupForm } from "./pages/signupPage/signupForm";
import Task from "./pages/taskPage/Task";
import Dashboard from "./pages/dashboard/dashboard";
import HomeLayout from "./layouts/homeLayout/homeLayout";
import LeaderBoard from "./pages/leaderboard/leaderBoard";
import TaskDescription from "./pages/taskDescription/taskDescription";
import Home from "./pages/home/home";

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
  );
}

export default App;
