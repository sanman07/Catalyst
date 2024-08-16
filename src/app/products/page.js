"use client"

import { useEffect, useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';

// Function to encode special characters in the category name
const encodeCategory = (category) => {
    return encodeURIComponent(category);
  };

const Products = () => {
  const [products, setProducts] = useState([]);
  const category = "men's clothing";
  const encodedCategory = encodeCategory(category);

  useEffect(() => {
    // Fetch products from the API
    fetch(`https://fakestoreapi.com/products/category/${encodedCategory}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Carousel>
        {products.map((product) => (
          <Carousel.Item key={product.id}>
            <img
              className="d-block w-100"
              src={product.image}
              alt={product.title}
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Products;
