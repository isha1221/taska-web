import React, { useState } from "react";
import "./dragCard.styles.css";
import { Box, Grid } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Base_Url } from "../../config/api.config";
import { Task } from "../forground/Foreground";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const updateTaskStatus = async (taskId: string) => {
  try {
    const response = await axios.patch(
      `${Base_Url}/tasks/${taskId}/status`,
      {
        taskStatus: true,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

interface DragCardProps {
  task: Task;
}

const DragCard: React.FC<DragCardProps> = ({ task }) => {
  const [isTaskDone, setIsTaskDone] = useState(() => {
    // Retrieve isTaskDone from local storage, defaulting to false if not found
    const storedIsTaskDone = localStorage.getItem(`task_${task.id}_done`);
    return storedIsTaskDone ? JSON.parse(storedIsTaskDone) : false;
  });

  const navigate = useNavigate();

  const handleDoneClick = async () => {
    try {
      await updateTaskStatus(task.id);
      toast.success("Task marked as done!");
      setIsTaskDone(true); // Mark the task as done

      // Store isTaskDone in local storage
      localStorage.setItem(`task_${task.id}_done`, JSON.stringify(true));
    } catch (error) {
      toast.error(
        <div>
          Failed to update task status
          <button
            onClick={() => window.location.reload()}
            className="toast-refresh-button"
          >
            Refresh
          </button>
        </div>
      );
    }
  };

  const handleMoreClick = () => {
    navigate(`/app/taskDescription/${task.id}`);
  };

  if (isTaskDone) {
    // If task is marked as done, do not render the card
    return null;
  }

  return (
    <div className="login-form-container">
      <form className="login-form">
        <div className="input-field">
          <Box className="input">{task.taskTitle}</Box>
          <div className="input-bottom-gradient" />
        </div>
        <Grid container>
          <Grid xs={1.5} className="clock">
            <AccessAlarmIcon />
          </Grid>
          <Grid xs={9.5} display={"flex"} paddingTop={"3px"} className="time">
            {new Date(task.endTime).toLocaleTimeString([], {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Grid>
          <Grid xs={1} className="delete">
            <DeleteIcon />
          </Grid>
        </Grid>
        <Grid container justifyContent={"space-between"}>
          <Grid xs={6} item>
            <button className="button1" type="button" onClick={handleMoreClick}>
              More
            </button>
          </Grid>
          <Grid xs={6} item display={"flex"} justifyContent={"center"}>
            <button className="button2" type="button" onClick={handleDoneClick}>
              Done
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default DragCard;
