import Circle from "../../components/circularFrame/Circle";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import "./profile.css";
import useUserStore from "../../stores/useUserStore";

const ProfilePage = () => {
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
    <Grid xs={12} height={"100vh"}>
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
          <Grid xs={12} py={1} className="img_profile">
            <Box display={"flex"} justifyContent={"center"}>
              <Circle></Circle>
            </Box>
          </Grid>
          <Grid xs={12} className="id_container" container>
            <Grid xs={6} display={"flex"} justifyContent={"center"} p={2}>
              <Box className="id_box1">{user.username}</Box>
            </Grid>
            <Grid xs={6} display={"flex"} justifyContent={"center"} p={2}>
              <Box className="id_box2">#{user.id}</Box>
            </Grid>
          </Grid>
          <Grid xs={12} display={"flex"} justifyContent={"center"} p={2}>
            <Box className="id_box3">{user.email}</Box>
          </Grid>
          <Grid xs={12} p={2}>
            <Box className="boi_container">
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bolder",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                BIO
              </Typography>
              <h5>{user.bio}</h5>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ProfilePage;
