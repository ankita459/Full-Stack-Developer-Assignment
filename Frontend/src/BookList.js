import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Card, CardContent, CardMedia, Typography, Grid, TextField, Button } from '@mui/material';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');
  const [priceRangeFilter, setPriceRangeFilter] = useState('');
  const [publicationDateFilter, setPublicationDateFilter] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://openlibrary.org/works.json?limit=10', {
        params: {
          subject: genreFilter,
          price: priceRangeFilter,
          publish_date: publicationDateFilter
        }
      });
      if (response.data && response.data.entries) {
        setBooks(response.data.entries);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleFilterSubmit = () => {
    fetchBooks();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Book List
      </Typography>
      <div>
        <TextField
          label="Genre"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Price Range"
          value={priceRangeFilter}
          onChange={(e) => setPriceRangeFilter(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Publication Date"
          value={publicationDateFilter}
          onChange={(e) => setPublicationDateFilter(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" onClick={handleFilterSubmit}>
          Apply Filters
        </Button>
      </div>
      <Grid container spacing={2}>
        {books &&
          books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.key}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                />
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {book.author_name && book.author_name.join(', ')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {book.description ? book.description.value : 'No description available'}
                  </Typography>
                  <Typography variant="subtitle1">{`Price: $${book.price}`}</Typography>
                  <Typography variant="subtitle1">{`Rating: ${book.rating}`}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default BookList;
