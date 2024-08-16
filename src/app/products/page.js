"use client"

import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <Carousel>
        {products.map((product) => (
          <Carousel.Item key={product.id}>
            <ProductCard product={product} />

          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Products;
