"use client"
import {useState, useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'

function Shop() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch('https://fakestoreapi.com/products?limit=9')
        .then((res) => res.json())
        .then((data) => setProducts(data))
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