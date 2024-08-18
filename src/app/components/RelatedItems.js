import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { CartState } from '../../../context/CartContext'
import ProductsCard from './ProductsCard'

const RelatedItems = () => {
    const { products } = CartState();
    return (
        <>
            <h2 class="fw-bolder mb-4">Related products</h2>
            <Row>
                {products.slice(0,3).map((product) => (
                    <Col md={4}>
                        <ProductsCard product={product} />
                    </Col>
                ) )}
            </Row>
        </>
    )
}

export default RelatedItems