"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        // Filter products to include only clothing items
        const clothingItems = data.filter(product =>
          product.category === "men's clothing" || product.category === "women's clothing"
        );
        setInventoryData(clothingItems);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    let data = [...inventoryData];

    if (category) {
      data = data.filter(item => item.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (searchQuery) {
      data = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (sort === 'Price: Low to High') {
      data = data.sort((a, b) => a.price - b.price);
    } else if (sort === 'Price: High to Low') {
      data = data.sort((a, b) => b.price - a.price);
    }

    setFilteredData(data);
  }, [inventoryData, searchQuery, category, sort]);

  return (
    <Box
      sx={{
        padding: '20px',
        height: '91vh',
        flexGrow: 1,
        marginTop: '10px',
        borderRadius: '20px',
        backgroundColor: 'white',
        maxHeight: '70vh',
        marginBottom: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: '600' }}>Inventory Page</Typography>

      {/* Search Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginRight: '10px' }}
        />
        <Button
          variant="contained"
          sx={{ padding: '10px 20px', backgroundColor: '#6200ea', color: 'white' }}
        >
          Search
        </Button>
      </Box>

      {/* Filters */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="men's clothing">Men's Clothing</MenuItem>
              <MenuItem value="women's clothing">Women's Clothing</MenuItem>
              <MenuItem value="jewelery">Jewelery</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Best Seller">Best Seller</MenuItem>
              <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
              <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Inventory List */}
      <Box
        sx={{
          borderRadius: '10px',
          border: '1px solid #e0e0e0',
          padding: '15px',
          height: 'calc(100% - 240px)', // Adjust height based on other content
          overflowY: 'auto', // Enable scrolling for this section only
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: '500' }}>Items</Typography>

        {/* Render inventory items dynamically */}
        {filteredData.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid #e0e0e0',
              '&:last-child': { borderBottom: 'none' }
            }}
          >
            <Box
              sx={{
                width: '60px',
                height: '60px',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                marginRight: '15px'
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1">{item.title}</Typography>
              <Typography variant="body2" color="textSecondary">ID: {item.id} | ${item.price} | Stock: {item.rating.count} units</Typography>
            </Box>
            <IconButton>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Inventory;
