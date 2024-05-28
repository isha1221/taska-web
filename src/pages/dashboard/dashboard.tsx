import { CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "./dashboard.css";
import Graph from "../../components/graph/Graph";
import useUserStore, { UserState } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../config/api.config";

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const { user, loading, error, setUser, setError, setLoading } =
    useUserStore(); // Get user data from the store

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          // Call the API to fetch user data if not available
          const response = await axios.get(`${Base_Url}/getAuth`, {
            withCredentials: true,
          });
          const userData: UserState = response.data;
          console.log(userData);
          setUser(userData);
          setLoading(false);
        }
      } catch (error) {
        toast.error("Failed to authenticate. Redirecting to login...");
        setError(`${error}`);
        setTimeout(() => {
          navigate("/login"); // Use navigate to go to login page
        }, 2000);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!user) {
    return null; // Wait for authentication
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
            <Graph></Graph>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Dashboard;
