import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "./leaderBoard.css";
import { FriendResponse } from "../../stores/useFriendsStore";
import { Base_Url } from "../../config/api.config";
import useUserStore from "../../stores/useUserStore";

const LeaderBoard: React.FC = () => {
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

  const [users, setUsers] = useState<FriendResponse[]>([]);
  const [apiLoading, setapiLoading] = useState(true);
  const [apiError, setapiError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post(
          `${Base_Url}/users/rank`,
          {},
          {
            withCredentials: true,
          }
        );
        setUsers(response.data);
      } catch (apiError) {
        setapiError("Failed to fetch leaderboard data");
        console.error(apiError);
      } finally {
        setapiLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
                  // src={user.avatar}
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
          {user.fullName}: {user.rank}{" "}
        </Typography>
      </Box>
    </Grid>
  );
};

export default LeaderBoard;
