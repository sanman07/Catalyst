"use client"

import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';



function RightArrow(props) {
  const { className, style, onClick } = props;
  return (
    <FontAwesomeIcon
    icon={faChevronRight}
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

function LeftArrow(props) {
  const { className, style, onClick } = props;
  return (
    <FontAwesomeIcon
    icon={faChevronLeft}
      className={className}
      style={{ ...style, display: "block", color: "black", fontSize: "50px" }}
      onClick={onClick}
    />
  );
}

// Function to encode special characters in the category name
const encodeCategory = (category) => {
  return encodeURIComponent(category);
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const category = "men's clothing";
  const encodedCategory = encodeCategory(category);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    accessibility: true,
    arrows: true,
    prevArrow: <LeftArrow />,
    nextArrow: <RightArrow />,
  };

  useEffect(() => {
    // Fetch products from the API
    fetch(`https://fakestoreapi.com/products/category/${encodedCategory}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Products;
