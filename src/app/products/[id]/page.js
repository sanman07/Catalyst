'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Col, Row, Modal } from 'react-bootstrap';
import { CartState } from '../../../../context/CartContext';
import RelatedItems from '../../components/RelatedItems';

const ProductDetail = ({ params }) => {
    const { id } = params;
    const { products, cart, setCart } = CartState();
    const [showModal, setShowModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [disabledSize, setDisabledSize] = useState(null);

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * sizes.length);
        setDisabledSize(sizes[randomIndex]);
    }, []);

    const product = products.find((product) => product.id === parseInt(id));

    const handleAddToCart = (product) => {
        setCart((prevCart) =>
            prevCart.some((item) => item.id === product.id)
                ? prevCart.filter((item) => item.id !== product.id)
                : [...prevCart, product]
        );
    };

    const handleSizeSelection = (size) => {
        setSelectedSize(size);
        setShowModal(true);
    };

    const handleRequestConfirmation = (confirm) => {
        setShowModal(false);
        if (confirm) {
            alert(`Request for size ${selectedSize} sent to the store!`);
        }
    };

    if (!product) {
        return <div className="container my-5">Loading...</div>;
    }

    return (
        <div className='py-5'>
            <Row className='py-5'>
                <Col md={6}>
                    <Image src={product.image} alt={product.title} width={300} height={350} objectFit='contain' />
                </Col>
                <Col md={6}>
                    <h1 className='display-5 fw-bolder'>{product.title}</h1>
                    
                    <div className='fs-5 mb-5'>
                        Price: ${product.price}
                    </div>
                    <p className='lead'>{product.description}</p>

                    <div className='mb-3'>
                        {sizes.map(size => (
                            <Button
                                key={size}
                                variant='outline-primary'
                                onClick={() => handleSizeSelection(size)}
                                className="me-2"
                                disabled={size === disabledSize}
                            >
                                {size}
                            </Button>
                        ))}
                    </div>

                    {cart.some((item) => item.id === product.id) ? (
                        <Button variant='secondary' onClick={() => handleAddToCart(product)}>Remove from Cart</Button>
                    ) : (
                        <Button variant='primary' onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                    )}
                </Col>
            </Row>

            <RelatedItems />

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Size Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to send a request to the store for size {selectedSize}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleRequestConfirmation(false)}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => handleRequestConfirmation(true)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductDetail;
