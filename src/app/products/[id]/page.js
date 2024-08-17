'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const ProductDetail = ({ params }) => {
    const { id } = params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then((res) => res.json())
                .then((data) => setProduct(data))
                .catch((error) => console.error('Error fetching product:', error));
        }
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container my-5">
            <h1>{product.title}</h1>
            <Image src={product.image} alt={product.title} width={300} height={300} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
        </div>
    );
};

export default ProductDetail;
