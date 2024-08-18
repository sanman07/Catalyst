'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '../components/DO_NOT_USE/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CartState } from '../../../context/CartContext';
import { Button } from 'react-bootstrap';


const Products = () => {
  const { cart, setCart, products } = CartState()
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = 3;

  const handleAddToCart = (product) => {
    setCart((prevCart) =>
      prevCart.some((item) => item.id === product.id)
        ? prevCart.filter((item) => item.id !== product.id)
        : [...prevCart, product]
    );
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const visibleProducts = products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="d-flex flex-column" style={{ height: 'calc(100vh - 60px)' }}>
      
      <h2 style={styles.subheading}>
        Select the product to request service
      </h2>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center">
            <button onClick={prevPage} className="btn btn-light me-3">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="row row-cols-1 row-cols-md-3 g-4" style={{ maxWidth: '900px' }}>
              {visibleProducts.map((product) => (
                <div key={product.id} className="col">
                  <div className="card h-100 cursor-pointer">
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                      <Link key={product.id} href={`/products/${product.id}`} passHref className="text-decoration-none text-reset">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={150}
                          height={150}
                          style={{ objectFit: 'contain' }}
                        />
                      </Link>
                    </div>
                    <div className="card-body d-flex flex-column" style={{ height: '150px' }}>
                      <h5 className="card-title">{product.title}</h5>
                      <div className="mt-auto">
                        <p className="card-text mb-0">${product.price}</p>
                      </div>
                    </div>
                    {cart.some((item) => item.id === product.id) ? (
                      <Button variant='secondary' onClick={() => handleAddToCart(product)}>Remove from Cart</Button>
                    ) : (
                      <Button variant='primary' onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                    )}

                  </div>
                </div>
              ))}
            </div>
            <button onClick={nextPage} className="btn btn-light ms-3">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
      <div className="text-center my-3">
        Page {currentPage + 1} of {totalPages}
      </div>
    </div>
  );
};

const styles = {
  subheading: {
    fontSize: '1.8rem',
    color: '#6D6D6D',
    marginBottom: '40px',
    fontWeight: '300',
    marginTop: '2%',
    fontFamily: '"Poppins", sans-serif',
    textAlign: 'center',  // Centers the text
    zIndex: 2,
    marginTop:'5%'  // Ensure text is above any background effects
  },
};

export default Products;
