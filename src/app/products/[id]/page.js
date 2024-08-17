'use client';
import Image from 'next/image';
import { Button, Col, Row } from 'react-bootstrap';
import { CartState } from '../../../../context/CartContext';
import RelatedItems from '../../components/RelatedItems';

const ProductDetail = ({ params }) => {
    const { id } = params;

    const { products, cart, setCart } = CartState();

    const product = products.find((product) => product.id === parseInt(id));

    const handleAddToCart = (product) => {
        setCart((prevCart) =>
            prevCart.some((item) => item.id === product.id)
                ? prevCart.filter((item) => item.id !== product.id)
                : [...prevCart, product]
        );
    };


    if (!product) {
        return <div className="container my-5">Loading...</div>;
    }

    return (
        <div className='py-5'>
        <Row className='py-5'>
            <Col md={6}>
                <Image src={product.image} alt={product.title} width={600} height={700} objectFit='contain' />
            </Col>
            <Col md={6}>
                <h1 className='display-5 fw-bolder'>{product.title}</h1>
                <div className='fs-5 mb-5'>
                    Price: ${product.price}
                </div>
                <p className='lead'>{product.description}</p>
                {cart.some((item) => item.id === product.id) ? (
                    <Button variant='secondary' onClick={() => handleAddToCart(product)}>Remove from Cart</Button>
                ) : (
                    <Button variant='primary' onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                )}
            </Col>
        </Row>
        <RelatedItems />
        </div>
    );
};

export default ProductDetail;
