"use client"
import {useState, useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import ProductCard from '../components/DO_NOT_USE/ProductCard'

function Shop() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch('https://fakestoreapi.com/products?limit=9')
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched data:", data);
          // Filter products to include only clothing items
          const clothingItems = data.filter(product =>
            (product.category.toLowerCase() === "men's clothing" || product.category.toLowerCase() === "women's clothing") && 
              !product.title.toLowerCase().includes("fjallraven")
            );
          console.log("Filtered clothing items:", clothingItems);
          setProducts(clothingItems);
        })
        .catch((error) => console.error('Error fetching products:', error));
    }, []);
    


  return (
    <>
    <Row>
        {products.map((product) => (
        <Col sm={6} md={3} className='my-3'>
            <ProductCard key={product.id} product={product} />
        </Col>
        ))}
    </Row>
    </>
  )
}

export default Shop