import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import "./taskDescription.css";
import Modal from "../../components/modal/Modal";
import useTasksStore from "../../stores/useTaskStore";

const TaskDescription = () => {
  const { taskId } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { tasks, loading, error, fetchTasks } = useTasksStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const task = tasks.find((task) => task.id === String(taskId));

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!task) {
    return <Typography>No task found</Typography>;
  }

  return (
    <>
      <Grid className="main_task_card" xs={12} container></Grid>
    </>
  );
};

export default TaskDescription;
