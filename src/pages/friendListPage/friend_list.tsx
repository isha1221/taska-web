import React, { useEffect, useState } from "react";
import SearchBar from "../../components/searchBar/searchBar";
import "./friend_list.css";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import { Base_Url } from "../../config/api.config";
import useFriensListStore from "../../stores/useFriendsStore";

// Main FriendList component with a search bar
const FriendList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Retrieve state and actions from the Zustand store
  const friends = useFriensListStore((state) => state.friends);
  const loading = useFriensListStore((state) => state.loading);
  const error = useFriensListStore((state) => state.error);
  const setFriendsList = useFriensListStore((state) => state.setFriends);
  const setLoading = useFriensListStore((state) => state.setLoading);
  const setResponseError = useFriensListStore((state) => state.setError);

  useEffect(() => {
    setLoading(true);
    const fetchFriends = async () => {
      try {
        const response = await axios.post(
          `${Base_Url}/friendlist`,
          {},
          {
            withCredentials: true, // If you need to include credentials
          }
        );
        setFriendsList(response.data);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setResponseError("Failed to fetch friend list");
        console.error(err);
      }
    };

    fetchFriends();
  }, [setFriendsList, setLoading, setResponseError]);

  // Filter the friends list based on the search term (by user ID)
  const filteredFriends = (friends || []).filter((friend) => {
    const searchId = parseInt(searchTerm, 10); // Convert search term to number
    return isNaN(searchId) || friend.id === searchId; // Match by ID
  });

  return (
    <Grid className="bg-slate-950">
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
          <Grid xs={12} display={"flex"} justifyContent={"center"} item>
            <Typography
              variant="h2"
              color={"white"}
              sx={{ fontFamily: "Courier New, Courier, monospace" }}
              className="list_heading"
            >
              Friend List
            </Typography>
          </Grid>
          <Grid xs={12} p={3} display={"flex"} justifyContent={"center"} item>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </Grid>
          <Grid xs={12} container item>
            {filteredFriends.map((friend) => (
              <Grid
                xs={12}
                p={1}
                px={1}
                justifyContent={"center"}
                display={"flex"}
                item
                key={friend.id}
              >
                <Grid className="user_id_container" container>
                  <Grid
                    xs={2}
                    py={2}
                    display={"flex"}
                    justifyContent={"center"}
                    item
                  >
                    <img
                      src={friend.profile || "./profile.png"}
                      alt={friend.fullName}
                      style={{
                        borderRadius: "50%",
                        border: "2px solid rgb(255,0,106)",
                        height: "70px",
                      }}
                    />
                  </Grid>
                  <Grid
                    xs={10}
                    display={"flex"}
                    alignItems={"center"}
                    className="user_id_box"
                    item
                  >
                    <Box>
                      <span
                        style={{
                          color: "white",
                          fontSize: "1.5em",
                          fontWeight: "bold",
                        }}
                      >
                        {friend.fullName}
                      </span>
                      <span
                        style={{
                          color: "white",
                          fontSize: "1.5em",
                          fontWeight: "bold",
                        }}
                      >
                        #{friend.id}
                      </span>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
          {error && <Typography color="error">{error}</Typography>}
        </>
      )}
    </Grid>
  );
};

export default FriendList;
