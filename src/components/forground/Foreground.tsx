import { useState, useEffect, useRef } from "react";
import FloatingActionButton from "../floatingActionButton/FloatingActionButton";
import Modal from "../modal/Modal";
import DragCard from "../dragableCard/dragCard";
import useTasksStore from "../../stores/useTaskStore";
import { CircularProgress, Grid } from "@mui/material";

// types.ts
export interface Task {
  id: string;
  userId: number;
  taskTitle: string;
  taskDescription: string;
  taskStatus: boolean;
  startTime: string;
  endTime: string;
  completedTime?: string;
}

const Foreground = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dragConstraintsRef = useRef(null);

  // Retrieve state and actions from the Zustand store
  const tasks = useTasksStore((state) => state.tasks);
  const loading = useTasksStore((state) => state.loading);
  const error = useTasksStore((state) => state.error);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="top-20 left-0 z-[1] w-full h-fit">
      <FloatingActionButton onClick={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      {loading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {tasks.map((task) => (
            <DragCard key={task.id} task={task} />
          ))}
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default Foreground;
