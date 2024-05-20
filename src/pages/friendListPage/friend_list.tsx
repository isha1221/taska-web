import React, { useState } from 'react';
import SearchBar from '../../components/searchBar/searchBar';
import './friend_list.css';
import { Box, Grid, Typography } from '@mui/material';
import { faker } from '@faker-js/faker';

// Define the Friend type
interface Friend {
  id: number;
  name: string;
  profilePicture: string;
}


const generateDummyFriends = (count: number): Friend[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: faker.name.fullName(), // Random name
      profilePicture: faker.image.avatar(), // Random profile picture
    }));
  };
  
  // Create a list of 10 dummy friends
  const dummyFriends = generateDummyFriends(10);
// Main FriendList component with a search bar
const FriendList: React.FC = () => {

const [searchTerm, setSearchTerm] = useState('');

// Filter the friends list based on the search term (by user ID)
const filteredFriends = dummyFriends.filter((friend) => {
  const searchId = parseInt(searchTerm, 10); // Convert search term to number
  return isNaN(searchId) || friend.id === searchId; // Match by ID
});

  return (

    < Grid className='bg-slate-950'>
    <Grid xs={12} display={'flex'} justifyContent={'center'} item>
        <Typography variant='h2' color={'white'} sx={{ fontFamily:'Courier New, Courier, monospace'}} className='list_heading'>Friend List</Typography>
    </Grid>
    <Grid xs={12} p={3} display={'flex'} justifyContent={'center'} item>
    <SearchBar value={searchTerm} onChange={setSearchTerm} /> 
    </Grid>
    <Grid xs={12} container item>
    {filteredFriends.map((friend) => (
        <Grid xs={12} p={1} px={1} justifyContent={'center'} display={'flex'} item>
    <Grid className='user_id_container' container>
    <Grid xs={2}  py={2} display={'flex'} justifyContent={'center'} item>
        <img
         src={friend.profilePicture}
            alt={friend.name}
            style={{ borderRadius: '50%', border:'2px solid rgb(255,0,106)',height:'70px' }}
           />
    </Grid>
    <Grid xs={10}  display={'flex'} alignItems={'center'}  className='user_id_box'item>
        <Box  >
    <span style={{  color: 'white',fontSize:'1.5em',fontWeight:'bold'}} >{friend.name}</span>
    <span style={{  color: 'white',fontSize:'1.5em',fontWeight:'bold'}}>#{friend.id}</span>
    </Box>
        </Grid>
    </Grid>
        </Grid>
))}
    </Grid>

    </Grid>
  );
};

export default FriendList;
