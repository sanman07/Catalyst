"use client"
import { createContext, useContext, useState } from "react";

const Cart = createContext();

const Context = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);

    fetch('https://fakestoreapi.com/products?limit=9')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));

    return <Cart.Provider value={{ cart, setCart, products }}>{children}</Cart.Provider>;
}

export const CartState = () => {
    return useContext(Cart);
}

export default Context;