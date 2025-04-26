import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('🔍 Product Detail:', data);
        setProduct(data);
      })
      .catch((err) => console.error('❌ Fetch Error:', err));
  }, [id]);

  if (!product) {
    return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Product not found 🫠</h2>
          <Link to="/" className="text-blue-500 hover:underline">⬅️ Back to list</Link>
        </div>
      );
  }

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded shadow-md mt-10">
    <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full aspect-square object-cover mb-3 rounded"
    />
    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
    <p className="text-gray-700 text-sm mb-3">{product.description}</p>
    <p className="text-lg font-semibold">${(product.price / 100).toFixed(2)} CAD</p>
    <Link
        to="/"
        className="inline-block mt-4 text-blue-500 hover:underline"
    >
        ⬅️ Back to list
    </Link>
    </div>
  );
}

export default ProductDetail;