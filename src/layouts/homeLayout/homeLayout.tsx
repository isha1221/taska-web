import React, { Fragment } from 'react'
import Navbar from '../../components/Navbar/navbar'
import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
    
    <Navbar></Navbar>
        <Outlet/>
        
    </>
  )
}

export default HomeLayout;