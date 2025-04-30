import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

function Header({ searchTerm, setSearchTerm }) {
  const { cartQuantity } = useContext(CartContext);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* 로고 */}
        <Link
          to="/"
          onClick={() => setSearchTerm('')}  // ✅ 검색어 초기화
          className="text-2xl font-bold text-pink-500"
          >
          🍰 SweetShop
        </Link>

        {/* 검색창 */}
        <div className="flex-grow mx-8">
          <input
            type="text"
            placeholder="Search desserts..."
            value={searchTerm}                 // ✅ 입력값 연결
            onChange={(e) => setSearchTerm(e.target.value)} // ✅ 입력할 때 업데이트
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* 장바구니 + 로그인 버튼 */}
        <div className="flex items-center space-x-4 relative">
          <Link
            to="/cart"
            className="relative px-4 py-2 text-pink-500 rounded hover:underline"
          >
            Cart 🛍️
            <span className="ml-1">({cartQuantity})</span>
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