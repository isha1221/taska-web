import { Grid, Typography } from "@mui/material";
import React from "react";
import "./home.css"; // Ensure this CSS file is imported
import TaskImage from "../../components/task_img_component/taskImage";
import ArrowButton from "../../components/arrowButton/arrowButton";
import Footer from "../../components/footer/Footer";

const Home: React.FC = () => {
  return (
    <>
      <Grid container height="100vh" xs={12}>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          container
          className="text_grid"
          p={"20px"}
          paddingLeft={"7%"}
        >
          <Grid
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
          >
            <h1 className="text1">
              Achieve More{" "}
              <span style={{ color: "#FF006A", fontWeight: "bold" }}>
                Together
              </span>{" "}
              with{" "}
              <span style={{ color: "#FF006A", fontWeight: "bold" }}>
                Taska
              </span>
            </h1>
          </Grid>
          <Grid xs={12} display="flex" justifyContent="center">
            <h2 className="text2">
              Your Ultimate{" "}
              <span style={{ color: "#FF006A", fontWeight: "bold" }}>
                To-Do and Task Manager
              </span>{" "}
              - Connect, Complete, Conquer!
            </h2>
          </Grid>
          <Grid xs={12}>
            <ArrowButton></ArrowButton>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <TaskImage></TaskImage>
        </Grid>
      </Grid>

      <Grid container height={"100%"} xs={12}>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          order={{ xs: 2, sm: 1 }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img src="/Group_9.png" alt="Group 8" />
        </Grid>
        <Grid item xs={12} sm={6} md={6} order={{ xs: 1, sm: 2 }}>
          <div className="features-container">
            <div className="feature">
              <h3>Collaborate & Compete</h3>
              <p>
                Add friends, share your tasks, and motivate each other to
                achieve more.
              </p>
            </div>
            <div className="feature">
              <h3>Earn Rewards</h3>
              <p>
                Get points for every task you complete and climb the
                leaderboard!
              </p>
            </div>
            <div className="feature">
              <h3>Stay Organized</h3>
              <p>
                Easily manage your to-do lists and never miss a deadline again.
              </p>
            </div>
            <div className="feature">
              <h3>Boost Productivity</h3>
              <p>
                Break down your tasks, set deadlines, and watch your
                productivity soar.
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
      <Footer></Footer>
    </>
  );
};

export default Home;
