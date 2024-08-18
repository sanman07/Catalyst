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
                <h1 style={styles.heading}>
                    The revolutionized way of in-store shopping experience.
                  </h1>
                  <h2 style={styles.subheading}>
                    Let's Get Started
                  </h2>
              <Link href="/login" passHref>
                <Button style={styles.button}>Login</Button>
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

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    backgroundColor: '#F3F4F6', // Light background color
    padding: '20px',
    maxWidth: '100%',
    backgroundImage: 'url(/path-to-your-background-image.png)', // Replace with your actual image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  heading: {
    fontSize: '3rem',
    color: '#4A4A4A',
    marginBottom: '20px',
    fontWeight: '700',
    fontFamily: '"Poppins", sans-serif',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    zIndex: 2, // Ensure text is above any background effects
  },
  subheading: {
    fontSize: '1.8rem',
    color: '#6D6D6D',
    marginBottom: '40px',
    fontWeight: '300',
    marginTop: '2%',
    fontFamily: '"Poppins", sans-serif',
    zIndex: 2, // Ensure text is above any background effects
  },
  button: {
    backgroundColor: '#FF6B6B',
    color: '#fff',
    padding: '15px 30px',
    fontSize: '1.2rem',
    fontWeight: '600',
    borderRadius: '30px', // Rounded button for a softer look
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    zIndex: 2, // Ensure button is above any background effects
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
  },
  buttonHover: {
    backgroundColor: '#FF5252',
    transform: 'scale(1.05)', // Slightly larger on hover
  },
};


export default Home;