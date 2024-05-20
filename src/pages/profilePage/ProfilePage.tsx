import React from 'react'
import Circle from '../../components/circularFrame/Circle'
import { Box, Grid, Typography } from '@mui/material'
import './profile.css';


const ProfilePage = () => {
  return (
  <Grid xs={12} height={'100vh'}>
    <Grid xs={12}  py={1} className='img_profile' ><Box display={'flex'} justifyContent={'center'}><Circle></Circle></Box></Grid>
    <Grid xs={12} className='id_container' container >
    <Grid xs={6} display={'flex'} justifyContent={'center'} p={2}><Box className='id_box1'>User Name</Box></Grid>
    <Grid xs={6}  display={'flex'} justifyContent={'center'} p={2}><Box className='id_box2'>User ID</Box></Grid>
    </Grid>
    <Grid xs={12}  display={'flex'} justifyContent={'center'} p={2}><Box className='id_box3'>User Email</Box></Grid>
    <Grid xs={12}  p={2} >
      <Box className="boi_container">
        <Typography variant='h3' sx={{fontWeight:'bolder',display:'flex',justifyContent:'center' }}>BIO</Typography>
        <h5>Hey! I'am Isha Pathak</h5>
      </Box>
    </Grid>
    
  </Grid>
  )
}

export default ProfilePage


 {/* <Grid xs={12} bgcolor={'purple'} className='id_container'>
    <Grid xs={6} bgcolor={'red'}>fghjk</Grid>
    <Grid xs={6} bgcolor={'yellow'}>fghjk</Grid>
    </Grid>
    <Grid xs={12}>
      <Box sx={{height:'80px',width:'200px',bgcolor:'lightblue'}}></Box>
    </Grid>
    <Grid xs={12} bgcolor={'green'}>
ghjk
    </Grid> */}