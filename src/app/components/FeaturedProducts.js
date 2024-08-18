'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { CartState } from '../../../context/CartContext';

const FeaturedProducts = () => {
    const { products, cart, setCart } = CartState();
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 3));
    }, [products]);

    const handleAddToCart = (product) => {
        setCart((prevCart) =>
            prevCart.some((item) => item.id === product.id)
                ? prevCart.filter((item) => item.id !== product.id)
                : [...prevCart, product]
        );
    };

    return (
        <Row>
            {featuredProducts.map((product) => (
                <Col key={product.id} md={4} className="mb-4">
                    <Card className="h-100">
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={150}
                                height={150}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text className="mt-auto mb-2">${product.price}</Card.Text>
                            <Link href={`/products/${product.id}`} passHref>
                                <Button variant="outline-primary" className="mb-2">View Details</Button>
                            </Link>
                            {cart.some((item) => item.id === product.id) ? (
                                <Button variant='secondary' onClick={() => handleAddToCart(product)}>Remove from Cart</Button>
                            ) : (
                                <Button variant='primary' onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default FeaturedProducts;