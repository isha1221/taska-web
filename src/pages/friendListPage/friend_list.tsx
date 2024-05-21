import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/searchBar/searchBar';
import './friend_list.css';
import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';

// Define the Friend type
interface Friend {
  id: number;
  username: string;
  fullName: string;
  email: string;
  branch: string;
  rank: number;
}

// Main FriendList component with a search bar
const FriendList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userId = 1; // Replace with the actual user ID you want to fetch friends for
        const response = await axios.post(`https://tr0sfbtq-6969.inc1.devtunnels.ms/friendlist`, {
          userId
        }, {
          withCredentials: true, // If you need to include credentials
        });
        setFriends(response.data);
      } catch (err) {
        setError('Failed to fetch friend list');
        console.error(err);
      }
    };

    fetchFriends();
  }, []);

  // Filter the friends list based on the search term (by user ID)
  const filteredFriends = friends.filter((friend) => {
    const searchId = parseInt(searchTerm, 10); // Convert search term to number
    return isNaN(searchId) || friend.id === searchId; // Match by ID
  });

  return (
    <Grid className='bg-slate-950'>
      <Grid xs={12} display={'flex'} justifyContent={'center'} item>
        <Typography variant='h2' color={'white'} sx={{ fontFamily: 'Courier New, Courier, monospace' }} className='list_heading'>Friend List</Typography>
      </Grid>
      <Grid xs={12} p={3} display={'flex'} justifyContent={'center'} item>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </Grid>
      <Grid xs={12} container item>
        {filteredFriends.map((friend) => (
          <Grid xs={12} p={1} px={1} justifyContent={'center'} display={'flex'} item key={friend.id}>
            <Grid className='user_id_container' container>
              <Grid xs={2} py={2} display={'flex'} justifyContent={'center'} item>
                <img
                  src={`https://img.icons8.com/fluency/96/docker.png`}
                  alt={friend.fullName}
                  style={{ borderRadius: '50%', border: '2px solid rgb(255,0,106)', height: '70px' }}
                />
              </Grid>
              <Grid xs={10} display={'flex'} alignItems={'center'} className='user_id_box' item>
                <Box>
                  <span style={{ color: 'white', fontSize: '1.5em', fontWeight: 'bold' }}>{friend.fullName}</span>
                  <span style={{ color: 'white', fontSize: '1.5em', fontWeight: 'bold' }}>#{friend.id}</span>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      {error && <Typography color="error">{error}</Typography>}
    </Grid>
  );
};

export default FriendList;
