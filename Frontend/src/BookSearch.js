import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/books?search=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" gutterBottom>
        Book Search
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <TextField
          label="Search by title, author, or category"
          style={{ marginRight: '16px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <Grid container spacing={2} justifyContent="center">
        {searchResults.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia style={{ objectFit: 'cover', height: 200, borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} component="img" image={book.cover_image} alt={book.title} />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {book.author}
                </Typography>
                <Typography variant="body2">{book.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BookSearch;
