'use client';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { CartState } from '../../../../context/CartContext';

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
        <div className="container my-5">
            <h1>{product.title}</h1>
            <Image src={product.image} alt={product.title} width={300} height={300} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            {cart.some((item) => item.id === product.id) ? (
                <Button variant='secondary' onClick={() => handleAddToCart(product)}>Remove from Cart</Button>
            ) : (
                <Button variant='primary' onClick={() => handleAddToCart(product)}>Add to Cart</Button>
            )}
        </div>
    );
};

export default ProductDetail;
