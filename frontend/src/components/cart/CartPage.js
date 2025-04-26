import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  // 🧮 총 가격 계산
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">🛒 Your cart is empty!</h2>
        <Link to="/" className="text-blue-500 hover:underline">⬅️ Back to shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>
      <ul className="space-y-4">
        {cartItems.map((item) => (
            <li key={item.id} className="border-b pb-4">
            <div className="flex justify-between items-center">
                <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                    {(item.price / 100).toFixed(2)} CAD x {item.quantity}
                </p>
                </div>
                <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline ml-4"
                >
                🗑️ Remove
                </button>
            </div>
            </li>
        ))}
      </ul>

      {/* 🧮 총 합계 표시 */}
      <div className="text-right mt-8 border-t pt-4">
        <h2 className="text-2xl font-bold">
          Total: ${(totalPrice / 100).toFixed(2)} CAD
        </h2>
      </div>

      <div className="mt-4 text-right">
        <button
            onClick={() => clearCart()}
            className="text-red-500 hover:underline"
        >
            🧹 Clear Cart
        </button>
      </div>

      <div className="mt-6">
        <Link to="/" className="text-blue-500 hover:underline">⬅️ Continue shopping</Link>
      </div>
    </div>
  );
}

export default CartPage;