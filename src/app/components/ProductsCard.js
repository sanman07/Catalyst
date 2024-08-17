import React from 'react'
import { Button } from 'react-bootstrap'
import { CartState } from '../../../context/CartContext'
import Image from 'next/image'
import Link from 'next/link'


const ProductsCard = ({product}) => {
    const { cart, setCart, products } = CartState()
  
    const handleAddToCart = (product) => {
      setCart((prevCart) =>
        prevCart.some((item) => item.id === product.id)
          ? prevCart.filter((item) => item.id !== product.id)
          : [...prevCart, product]
      );
    };
  

  return (
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
  )
}

export default ProductsCard