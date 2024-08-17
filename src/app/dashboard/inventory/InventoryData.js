import React from 'react';
import Inventory from './Inventory'; // Assuming Inventory is in the same folder

const inventoryData = [
  {
    id: 'A98JK9H',
    name: 'Air Jordan 1 Retro OG "Chicago"',
    price: 1289,
    stock: 76,
    category: 'Sneakers',
    brand: 'Nike',
    imageUrl: 'https://example.com/air-jordan-1.jpg' // Example image URL
  },
  {
    id: 'C12K8IG',
    name: 'Air Jordan 1 Bred Toe',
    price: 999,
    stock: 93,
    category: 'Sneakers',
    brand: 'Nike',
    imageUrl: 'https://example.com/air-jordan-1-bred.jpg' // Example image URL
  },
  {
    id: 'A46HI2O',
    name: 'Air Jordan Jumpman',
    price: 1479,
    stock: 113,
    category: 'Sneakers',
    brand: 'Nike',
    imageUrl: 'https://example.com/air-jordan-jumpman.jpg' // Example image URL
  }
  // Add more items as needed
];

const ParentComponent = () => {
  return (
    <div>
      <Inventory items={inventoryData} />
    </div>
  );
};

export default ParentComponent;
