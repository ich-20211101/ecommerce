import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* 로고 */}
        <Link to="/" className="text-2xl font-bold text-pink-500">
          🍰 SweetShop
        </Link>

        {/* 검색창 */}
        <div className="flex-grow mx-8">
          <input
            type="text"
            placeholder="Search desserts..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* 장바구니 + 로그인 버튼 */}
        <div className="flex items-center space-x-4">
          <Link
            to="/cart"
            className="px-4 py-2 text-pink-500 rounded hover:underline"
          >
            Cart 🛍️
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 text-pink-500 rounded hover:underline"
          >
            Login 🔐
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;