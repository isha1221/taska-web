import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { faker } from '@faker-js/faker';
import StarIcon from '@mui/icons-material/Star';
import "./leaderBoard.css";

// Main FriendList component with a search bar
const LeaderBoard: React.FC = () => {
  // Generate random data using Faker
  const generateRandomData = () => ({
    name: faker.person.firstName(),
    username: faker.internet.userName(),
    avatar: faker.image.avatar(),
  });

  // Generate an array of random users
  const users = Array.from({ length: 10 }, () => generateRandomData());

  // Helper function to render stars
  const renderStars = (rank: number) => {
    const starColor = rank === 0 ? 'gold' : rank === 1 ? 'silver' : rank === 2 ? 'brown' :'transparent';
    const starText = rank === 0 ? '1' : rank === 1 ? '2' : rank === 2 ? '3' : '';

    return (
      <Box display="flex" alignItems="center" ml="auto">
        <StarIcon sx={{ color: starColor, fontSize: '2rem' }} />
        <Typography sx={{ color: starColor, fontSize: '1.5rem', marginLeft: '5px' }}>
          {starText}
        </Typography>
      </Box>
    );
  };

  return (
    <Grid container className="bg-slate-950" marginBottom={'135px'}>
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
            key={index}
            item
            xs={12}
            p={1}
            px={1}
            display="flex"
            justifyContent="center" 
          
          >
            <Grid container className="user_id_container" >
              <Grid
                item
                xs={2}
                py={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={user.avatar}
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
                    {user.name}
                  </span>
                  <br />
                  <span
                    style={{
                      color: "white",
                      fontSize: "1em",
                    }}
                  >
                    {user.username}
                  </span>
                </Box>
              </Grid>
              <Grid
                container
                xs={2}
                display='flex'
                justifyContent='center'
                // py={2}
                paddingRight={'30px'}
                
              >
                {renderStars(index)}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
     
          width: '100%',
          height: '110px',
          position: 'fixed',
          bottom: 0,
          zIndex: 1000,
          borderTop:'2px solid rgb(255,0,106)',
          background:'rgba(53, 53, 56, 0.2)', 
          boxShadow:' 0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter : ' blur(5px)',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
       <Typography sx={{color:'white', fontWeight:'bolder',fontSize:'2em',fontFamily:'Courier New, Courier, monospace'}}> Isha Pathak: 12345 </Typography>
      </Box>
    </Grid>
  );
};

export default LeaderBoard;
