import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import './taskDescription.css';
import Modal from '../../components/modal/Modal';
import useTasksStore from '../../stores/useTaskStore';

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
    <Grid container xs={12} p={4} height={'100dvh'} display={'flex'} justifyContent={'center'} className='task-description-main'>
      <Grid container xs={12} p={2} display={'flex'} justifyContent={'center'}>
        <Grid xs={12} display={'flex'} justifyContent={'center'}>
          <Box className="task-description-inner-container">
            <Grid container key={task.id} xs={12}>
              <Grid xs={12} display={'flex'} justifyContent={'center'}>
                <Typography variant="h4" color={'white'} p={2} sx={{fontFamily:'Courier New, Courier, monospace'}}>{task.taskTitle}</Typography>
              </Grid>
              <Grid xs={12} display={'flex'} justifyContent={'center'}>
                <Box sx={{ border: '2px solid rgb(255,0,106)', height: '70vh', padding: '20px', margin: '20px', marginBottom: '50px', width: '90%', borderRadius: '25px' }}>
                  {task.taskDescription}
                </Box>
              </Grid>
              <Grid container justifyContent={"space-between"}>
                <Grid xs={6} item>
                  <button className="button1" type="button" onClick={openModal}>
                    Edit
                  </button>
                </Grid>
                <Grid xs={6} item display={"flex"} justifyContent={"center"}>
                  <button className="button2" type="button">
                    Save
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>
    </Grid>
  );
}

export default TaskDescription;
