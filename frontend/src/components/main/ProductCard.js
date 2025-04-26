import React from 'react';

function ProductCard({ name, description, price }) {
  return (
    <div className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <p className="text-blue-500 font-semibold text-lg">${price}</p>
    </div>
  );
}

export default ProductCard;