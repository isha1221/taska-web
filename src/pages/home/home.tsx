import { Grid } from "@mui/material";
import React from "react";
import "./home.css"; // Ensure this CSS file is imported
import TaskImage from "../../components/task_img_component/taskImage";

const Home: React.FC = () => {
  return (
    <>
      <Grid container height="100vh" xs={12}>
        <Grid
          item
          xs={12}
          sm={4}
          md={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <div>fhgj</div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <TaskImage></TaskImage>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
