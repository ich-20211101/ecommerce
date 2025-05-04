// 👇 import 추가
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { toast } from 'react-toastify';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const fetchProduct = useCallback(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch((err) => console.error('❌ Fetch Error:', err));
  }, [id]);
  
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('🎉 Added to cart!', { position: 'top-center', autoClose: 1000 });
  };

  const handleDelete = (reviewId) => {
    fetch(`http://localhost:8080/api/reviews/${reviewId}`, {
      method: 'DELETE',
    })
      .then(() => {
        toast.success('🗑️ Review deleted!');
        setProduct((prev) => ({
          ...prev,
          reviews: prev.reviews.filter((r) => r.id !== reviewId),
        }));
      })
      .catch((err) => {
        console.error('❌ Delete Error:', err);
        toast.error('Failed to delete review');
      });
  };

  const handleEditClick = (review) => {
    setEditingReviewId(review.id);
    setUsername(review.username);
    setContent(review.content);
    setRating(review.rating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = { username, content, rating: Number(rating) };

    if (editingReviewId) {
      // 수정
      fetch(`http://localhost:8080/api/reviews/${editingReviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      })
        .then((res) => res.json())
        .then((updated) => {
          toast.success('✏️ Review updated!');
          setProduct((prev) => ({
            ...prev,
            reviews: prev.reviews.map((r) =>
              r.id === updated.id ? updated : r
            ),
          }));
          setEditingReviewId(null);
          setUsername('');
          setContent('');
          setRating(5);
        });
    } else {
      // 생성
      fetch(`http://localhost:8080/api/product/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      })
        .then((res) => res.json())
        .then((saved) => {
          toast.success('✅ Review added!');
          setProduct((prev) => ({
            ...prev,
            reviews: [...prev.reviews, saved],
          }));
          setUsername('');
          setContent('');
          setRating(5);
        })
        .catch((err) => {
          console.error('❌ Submit error:', err);
          toast.error('Failed to submit review');
        });
    }
  };

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Product not found 🫠</h2>
        <Link to="/" className="text-blue-500 hover:underline">⬅️ Back to list</Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-10">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full aspect-square object-cover mb-3 rounded"
      />

      <h2 className="text-xl font-bold mb-1">{product.name}</h2>

      {product.tags?.length > 0 && (
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

      <p className="text-gray-700 text-sm mb-3">{product.description}</p>
      <p className="text-lg font-semibold">${(product.price / 100).toFixed(2)} CAD</p>

      <button
        onClick={handleAddToCart}
        className="mt-4 text-blue-500 hover:underline bg-transparent border-none p-0 cursor-pointer"
      >
        🛒 Add to Cart
      </button>

      <div className="text-right">
        <Link
          to="/"
          className="inline-block mt-4 text-blue-500 hover:underline"
        >
          ⬅️ Back to list
        </Link>
      </div>

      {/* 💬 리뷰 목록 */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">📝 Reviews</h3>
        {product.reviews?.length > 0 ? (
          <ul className="space-y-4">
            {product.reviews.map((review) => (
              <li key={review.id} className="border-t pt-4">
                <p className="font-semibold">
                  {review.username} <span className="text-yellow-500">⭐ {review.rating}</span>
                </p>
                <p className="text-sm text-gray-700">{review.content}</p>
                <p className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>

                {/* 수정 / 삭제 버튼 */}
                <div className="mt-2 flex space-x-4 text-sm">
                  <button className="text-blue-500 hover:underline" onClick={() => handleEditClick(review)}>
                    ✏️ Edit
                  </button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete(review.id)}>
                    ❌ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        )}
      </div>

      {/* ✍️ 리뷰 작성/수정 폼 */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">
          {editingReviewId ? 'Edit Review' : 'Leave a Review'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2 border rounded"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your review"
            className="w-full px-3 py-2 border rounded"
            rows={3}
            required
          />
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r !== 1 && 's'}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
          >
            {editingReviewId ? 'Update Review' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductDetail;