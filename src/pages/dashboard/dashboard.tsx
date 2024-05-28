import { CircularProgress, Grid, Typography } from "@mui/material";
import "./dashboard.css";
import Graph from "../../components/graph/Graph";
import useUserStore from "../../stores/useUserStore";

// import BasicLineChart from '../../components/graph/Graph'

const Dashboard = () => {
  const { user, loading, error } = useUserStore(); // Get user data from the store

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!user) {
    return <Typography>No user data available</Typography>;
  }

  return (
    <Grid
      xs={12}
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      container
    >
      {loading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <>
          <Grid
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="h3" className="title">
              Rank: {user.rank}
            </Typography>
          </Grid>
          <Grid
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            p={1}
          >
            {/* <Grid xs={12} maxHeight={'1000px'} maxWidth={'1000px'}> */}
            <Graph></Graph>
            {/* </Grid>   */}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Dashboard;
