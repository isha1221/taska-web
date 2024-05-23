import Background from '../../components/taskBackground/Background'
import Foreground from '../../components/forground/Foreground'
import { Outlet } from 'react-router-dom'


const Task = () => {
    
  return (
    <div className='relative w-full h-full '>
      
    <Background></Background>
    <Foreground></Foreground>
   

</div>
  )
}

export default Task