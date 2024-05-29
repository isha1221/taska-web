import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Grid, Typography } from "@mui/material";
import "./taskDescription.css";
import useTasksStore from "../../stores/useTaskStore";
import EditTextModal from "../../components/editTextModal/editTextModal";
import routes from "../../routes";

const TaskDescription = () => {
  const { taskId } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const navigate = useNavigate();
  const sendToTask = () => navigate(routes.Task);

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
      <Grid
        xs={12}
        container
        height={"100vh"}
        className="task-description-main"
      >
        <Grid
          className="task-description-inner-container"
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            xs={12}
            height={"60%"}
            width={"80%"}
            display={"flex"}
            justifyContent={"center"}
            className="task_container"
            container
          >
            <Grid
              xs={12}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              border={"2px solid rgba(255, 0, 106)"}
            >
              <h1 style={{ fontSize: "2em", color: "white" }}>
                {task.taskTitle}
              </h1>
            </Grid>
            <Grid
              xs={12}
              height={"60%"}
              width={"60%"}
              p={6}
              border={"2px solid rgba(255, 0, 106)"}
            >
              {" "}
              <p style={{ color: "white" }}>{task.taskDescription}</p>
            </Grid>

            <Grid container justifyContent={"space-between"}>
              <Grid xs={6} item>
                <button className="btn1" type="button" onClick={openModal}>
                  Edit
                </button>
              </Grid>
              <Grid xs={6} item>
                <button className="btn2" type="button" onClick={sendToTask}>
                  Close
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <EditTextModal isOpen={isModalOpen} onClose={closeModal} task={task}>
        {/* Modal content goes here */}
      </EditTextModal>
    </>
  );
};

export default TaskDescription;
