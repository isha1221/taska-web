import Background from "../../components/taskBackground/Background";
import Foreground from "../../components/forground/Foreground";

const Task = () => {
  return (
    <div className="absolute w-full h-full z-[-10] bg-slate-950">
      <Background></Background>
      <Foreground></Foreground>
    </div>
  );
};

export default Task;
