import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList({ searchTerm }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
        const res = await fetch(`http://localhost:8080/api/products${query}`);
        const data = await res.json();
        console.log('📦 API Response:', data);
        setProducts(data);
      } catch (err) {
        console.error('❌ Fetch Error:', err);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <div className="p-4">
      {products.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">😢 No desserts found!</h2>
          <p className="text-gray-500">Try searching for something else.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="p-4 border rounded hover:shadow-lg bg-white transition-all duration-200"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-bold mb-1">{product.name}</h2>
  
              {/* 🏷️ 태그 배지 */}
              {product.tags && product.tags.length > 0 && (
                <div className="mb-2">
                  {product.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-block text-xs bg-pink-100 text-pink-600 font-semibold mr-2 px-2.5 py-0.5 rounded"
                    >
                      {tag === 'NEW' ? '🆕 New' : tag === 'BEST' ? '🔥 Best' : tag}
                    </span>
                  ))}
                </div>
              )}
  
              <p className="text-gray-700 text-sm mb-1">{product.description}</p>
              <p className="text-pink-500 font-semibold">
                ${(product.price / 100).toFixed(2)} CAD
              </p>

              {/* 📝 리뷰 개수 표시 */}
              {typeof product.reviewCount === 'number' && product.reviewCount > 0 && (
                <p className="text-sm text-gray-500 mb-1">
                  📝 {product.reviewCount} review{product.reviewCount !== 1 && 's'}
                </p>
              )}

            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;