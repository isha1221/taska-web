import { Grid, Typography } from '@mui/material'
import React from 'react'
import './dashboard.css'
import Circle from '../../components/circularFrame/Circle'
import Graph from '../../components/graph/Graph'

// import BasicLineChart from '../../components/graph/Graph'

const Dashboard = () => {
  return (
    <Grid xs={12}  height={'100vh'}  display={'flex'} alignItems={'center'} container>



<Grid xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
<Typography variant='h3' className='title'>Rank: 1234</Typography>
    

  


</Grid>
<Grid xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'} p={1}  >
  
  {/* <Grid xs={12} maxHeight={'1000px'} maxWidth={'1000px'}> */}
    <Graph></Graph>
    {/* </Grid>   */}
  

</Grid>
    </Grid>
  )
}

export default Dashboard
