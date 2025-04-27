import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList({ searchTerm }) {
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

  // ✅ 검색어로 필터링
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">😢 No desserts found!</h2>
          <p className="text-gray-500">Try searching for something else.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
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
      )}
    </div>
  );
}

export default ProductList;