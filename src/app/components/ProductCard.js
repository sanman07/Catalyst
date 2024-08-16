// components/ProductCard.js
import { Card, Button, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const sizes = [32, 33, 34, 35, 36];
  const colors = ['#FF5733', '#33FF57', '#3357FF']; // Example colors

  return (
    <Card style={{ width: '20vw' }} className="mb-4">
      <Card.Img variant="top" src={product.image} alt={product.title} />
      <Card.Body>
        <Card.Title>{product.title.substring(0, 20) + "..."}</Card.Title>
        <Card.Text>
          <strong>Price:</strong> ${product.price}
        </Card.Text>
        
        {/* Sizes */}
        <div className="mb-3">
          <strong>Sizes:</strong>
          <div className="mt-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant="outline-secondary"
                className="me-2 mb-2"
                disabled={size % 2 === 0} // Example logic: Disable even sizes
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-3">
          <strong>Colors:</strong>
          <div className="mt-2">
            {colors.map((color, index) => (
              <span
                key={index}
                className="d-inline-block me-2"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  border: '2px solid gray',
                  display: 'inline-block'
                }}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <Button variant="primary"><Link className='text-white text-decoration-none' href="#">Add to Cart</Link></Button>
          <Button variant="secondary"><Link className='text-white text-decoration-none' href="#">Details</Link></Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
