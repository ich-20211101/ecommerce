// src/contexts/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // 상품 추가
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // 이미 장바구니에 있으면 수량만 +1
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // 없으면 새로 추가 (quantity 1로)
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // 상품 삭제
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  // 카트 전체 비우기
  const clearCart = () => {
    setCartItems([]);
  };

  // 장바구니 총 수량 계산
  const cartQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartQuantity }}>
      {children}
    </CartContext.Provider>
  );
}