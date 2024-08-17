"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = 3;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=9')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const visibleProducts = products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="d-flex flex-column" style={{ height: 'calc(100vh - 60px)' }}>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center">
            <button onClick={prevPage} className="btn btn-light me-3">
              <FaChevronLeft />
            </button>
            <div className="row row-cols-1 row-cols-md-3 g-4" style={{ maxWidth: '900px' }}>
              {visibleProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} passHref className="text-decoration-none text-reset">
                  <div className="col">
                    <div className="card h-100 cursor-pointer">
                      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={150}
                          height={150}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <div className="card-body d-flex flex-column" style={{ height: '150px' }}>
                        <h5 className="card-title">{product.title}</h5>
                        <div className="mt-auto">
                          <p className="card-text mb-0">${product.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <button onClick={nextPage} className="btn btn-light ms-3">
              <FaChevronRight />
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

export default Products;