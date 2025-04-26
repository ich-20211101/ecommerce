import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then((res) => res.json())
      .then((data) => {
        console.log('📦 API Response:', data);
        setProducts(data);
      })
      .catch((err) => console.error('❌ Fetch Error:', err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map(product => (
        <Link
          to={`/products/${product.id}`}
          key={product.id}
          className="p-4 border rounded hover:shadow-lg bg-white transition-all duration-200"
        >
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-2 rounded" />
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p>{product.description}</p>
          <p>${(product.price / 100).toFixed(2)} CAD</p>
        </Link>
      ))}
    </div>
  );
}

export default ProductList;