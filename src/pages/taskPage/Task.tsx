import Background from '../../components/taskBackground/Background'
import Foreground from '../../components/forground/Foreground'
import { Outlet } from 'react-router-dom'


const Task = () => {
    
  return (
    <div className='absolute w-full h-full z-[-10]'>
      
    <Background></Background>
    <Foreground></Foreground>
   

</div>
  )
}

export default Task