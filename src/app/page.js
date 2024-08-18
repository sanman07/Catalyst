'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTags, faTruck } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';

const DynamicFeaturedProducts = dynamic(() => import('./components/FeaturedProducts'), { ssr: false });

const Home = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: 'calc(100vh - 60px)' }}>
      {/* Hero Section */}
      <div className="py-5" style={{ backgroundColor: 'transparent' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="display-4" style={{ color: 'black' }}>Welcome to SimplyShop</h1>
              <p className="lead" style={{ color: 'black' }}>Discover amazing products at unbeatable prices!</p>
              <Link href="/login" passHref>
                <Button variant="outline-dark" size="lg">Login</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Featured Products Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <DynamicFeaturedProducts />
      </Container>

      {/* Features Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <FontAwesomeIcon icon={faShoppingCart} size="3x" className="text-primary mb-3" />
              <h4>Easy Shopping</h4>
              <p>Browse and purchase with just a few clicks</p>
            </Col>
            <Col md={4} className="mb-4">
              <FontAwesomeIcon icon={faTags} size="3x" className="text-primary mb-3" />
              <h4>Great Deals</h4>
              <p>Enjoy competitive prices and regular discounts</p>
            </Col>
            <Col md={4} className="mb-4">
              <FontAwesomeIcon icon={faTruck} size="3x" className="text-primary mb-3" />
              <h4>Fast Delivery</h4>
              <p>Quick and reliable shipping to your doorstep</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Call to Action Section */}
      <Container className="my-5 text-center">
        <h2>Ready to start shopping?</h2>
        <p className="lead mb-4">Login to your account to explore our wide range of products.</p>
        <Link href="/login" passHref>
          <Button variant="primary" size="lg">Login</Button>
        </Link>
      </Container>
    </div>
  );
};

export default Home;