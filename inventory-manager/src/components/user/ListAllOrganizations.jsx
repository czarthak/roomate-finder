import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import { TextField, Avatar } from '@mui/material';


const ListAllOrganizations = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get("http://localhost:8080/user/all");
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.fname.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.lname.toLowerCase().includes(searchInput.toLowerCase())
  );

  const getImageUrl = (email) => {
    const imageName = email.replace(/[@.]/g, '') + '.jpeg';
    console.log(imageName);
    // Update the path according to where your images are served from
    const imageUrl = `${process.env.PUBLIC_URL}/${imageName}`;
    return imageUrl;
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        sx={{ mb: 2, width: '100%' }}
      />
      <Grid container spacing={2}>
        {filteredUsers.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Avatar
                src={getImageUrl(user.email)}
                sx={{ width: 56, height: 56, m: 2 }}
                alt={`${user.fname} ${user.lname}`}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {user.fname} {user.lname}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2">
                  Phone: {user.phoneNumber}
                </Typography>
                <Typography variant="body2">
                  Major: {user.major}
                </Typography>
                <Typography variant="body2">
                  Year: {user.year}
                </Typography>
                {/* Add more user details here as needed */}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(`/users/${user.email}/details`)}>View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export { ListAllOrganizations };
