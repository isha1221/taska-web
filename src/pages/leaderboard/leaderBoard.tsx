import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "./leaderBoard.css";
import { FriendResponse } from "../../stores/useFriendsStore";
import { Base_Url } from "../../config/api.config";
import useUserStore from "../../stores/useUserStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LeaderBoard: React.FC = () => {
  const {
    user,
    loading: storeLoading,
    setUser,
    setLoading,
    setError,
  } = useUserStore(); // Get user data from the store

  const [users, setUsers] = useState<FriendResponse[]>([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Call the API to fetch user data if not available
        const response = await axios.get(`${Base_Url}/getAuth`, {
          withCredentials: true,
        });
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        toast.error("Failed to fetch user data. Redirecting to login...");
        setError(`${error}`);
        setTimeout(() => {
          navigate("/login"); // Navigate to the login page after displaying the error message
        }, 2000); // Adjust the timeout as needed
      } finally {
        setLoading(false);
      }
    };

    const fetchUsersRank = async () => {
      try {
        setApiLoading(true);
        // Call the API to fetch leaderboard data
        const response = await axios.post(
          `${Base_Url}/users/rank`,
          {},
          { withCredentials: true }
        );
        const leaderboardData: FriendResponse[] = response.data;
        setUsers(leaderboardData);
      } catch (error) {
        setApiError("Failed to fetch leaderboard data");
        console.error(error);
      } finally {
        setApiLoading(false);
      }
    };

    if (!user) {
      fetchData();
    }

    fetchUsersRank();
  }, [user, setUser, setError, setLoading]);

  if (storeLoading || apiLoading) {
    return <CircularProgress color="secondary" />;
  }

  const renderStars = (rank: number) => {
    const starColor =
      rank === 0
        ? "gold"
        : rank === 1
        ? "silver"
        : rank === 2
        ? "brown"
        : "transparent";
    const starText =
      rank === 0 ? "1" : rank === 1 ? "2" : rank === 2 ? "3" : "";

    return (
      <Box display="flex" alignItems="center" ml="auto">
        <StarIcon sx={{ color: starColor, fontSize: "2rem" }} />
        <Typography
          sx={{ color: starColor, fontSize: "1.5rem", marginLeft: "5px" }}
        >
          {starText}
        </Typography>
      </Box>
    );
  };

  if (apiLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress color="secondary" />
      </Grid>
    );
  }

  if (apiError) {
    return <Typography>apiError: {apiError}</Typography>;
  }

  return (
    <Grid container className="bg-slate-950" marginBottom={"135px"}>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Typography
          variant="h2"
          color="white"
          sx={{ fontFamily: "Courier New, Courier, monospace" }}
          className="list_heading"
        >
          Leader Board
        </Typography>
      </Grid>
      <Grid item xs={12} container>
        {users.map((user, index) => (
          <Grid
            key={user.id} // Use user.id for the key
            item
            xs={12}
            p={1}
            px={1}
            display="flex"
            justifyContent="center"
          >
            <Grid container className="user_id_container">
              <Grid
                item
                xs={2}
                py={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={user.profile || "/profile.png"}
                  alt={user.username}
                  style={{
                    borderRadius: "50%",
                    border: "2px solid rgb(255,0,106)",
                    height: "70px",
                  }}
                />
              </Grid>
              <Grid
                item
                xs={8}
                display="flex"
                alignItems="center"
                className="user_id_box"
              >
                <Box>
                  <span
                    style={{
                      color: "white",
                      fontSize: "1.5em",
                      fontWeight: "bold",
                    }}
                  >
                    {user.username}
                  </span>
                  <br />
                  <span
                    style={{
                      color: "white",
                      fontSize: "1em",
                    }}
                  >
                    {user.fullName}
                  </span>
                </Box>
              </Grid>
              <Grid
                container
                xs={2}
                display="flex"
                justifyContent="center"
                paddingRight={"30px"}
              >
                {renderStars(index)}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          width: "100%",
          height: "110px",
          position: "fixed",
          bottom: 0,
          zIndex: 1000,
          borderTop: "2px solid rgb(255,0,106)",
          background: "rgba(53, 53, 56, 0.2)",
          boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: " blur(5px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "bolder",
            fontSize: "2em",
            fontFamily: "Courier New, Courier, monospace",
          }}
        >
          {" "}
          You: {user?.rank}{" "}
        </Typography>
      </Box>
    </Grid>
  );
};

export default LeaderBoard;
