import React, { useState, useEffect } from 'react';
import './dragCard.styles.css';
import { Box, Grid } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Base_Url } from '../../config/api.config';
import { Task } from '../forground/Foreground';
import { useNavigate } from 'react-router-dom';

export const updateTaskStatus = async (taskId: string) => {
  try {
    const response = await axios.patch(`${Base_Url}/tasks/${taskId}/status`, {
      taskStatus: true,
    }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

interface DragCardProps {
  task: Task;
}

const DragCard: React.FC<DragCardProps> = ({ task }) => {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleDoneClick = async () => {
    try {
      await updateTaskStatus(task.id);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleMoreClick = () => {
    navigate(`/app/taskDescription/${task.id}`);
  };

  return (
    <div className="login-form-container">
      <form className="login-form">
        <div className="input-field">
          <Box className="input">
            {task.taskTitle}
          </Box>
          <div className="input-bottom-gradient" />
        </div>
        <Grid container>
          <Grid xs={1.5} className='clock'><AccessAlarmIcon /></Grid>
          <Grid xs={9.5} display={'flex'} paddingTop={'3px'} className='time'>
            {new Date(task.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Grid>
          <Grid xs={1} className='delete'><DeleteIcon /></Grid>
        </Grid>
        <Grid container justifyContent={'space-between'}>
          <Grid xs={6} item>
            <button className="button1" type="button" onClick={handleMoreClick}>
              More
            </button>
          </Grid>
          <Grid xs={6} item display={'flex'} justifyContent={'center'}>
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
