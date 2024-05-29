import { CircularProgress, Grid, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "./profile.css";
import Circle from "../../components/circularFrame/Circle";
import useUserStore from "../../stores/useUserStore";
import axios from "axios";
import { Base_Url } from "../../config/api.config";

const ProfilePage = () => {
  const { user, loading, error, setUser, setError, setLoading } =
    useUserStore(); // Get user data from the store

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          setLoading(true);
          // Call the API to fetch user data if not available
          const response = await axios.get(`${Base_Url}/getAuth`, {
            withCredentials: true,
          }); // Replace Base_Url with your actual base URL
          const userData = response.data;
          setUser(userData);
          setLoading(false);
        }
      } catch (error) {
        toast.error("Failed to fetch user data.");
        setError(`${error}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [user, setUser, setError, setLoading]);

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
      <>
        <Grid
          xs={12}
          py={1}
          className="img_profile"
          container
          justifyContent="center"
          alignItems="center"
        >
          <Circle imageUrl={user.profile}></Circle>
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
            <h5 style={{ paddingLeft: "25px", paddingRight: "25px" }}>
              {user.bio}
            </h5>
          </Box>
        </Grid>
      </>
    </Grid>
  );
};

export default ProfilePage;
