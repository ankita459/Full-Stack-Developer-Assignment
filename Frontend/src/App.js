import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BookList from './BookList';
import BookSearch from './BookSearch';

import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" color="inherit" style={{ textDecoration: 'none' }}>
            Bookstore
          </Typography>
          <Typography variant="h6" component={Link} to="/search" color="inherit" style={{ textDecoration: 'none', marginLeft: '1rem' }}>
            Search
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/search" element={<BookSearch />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
