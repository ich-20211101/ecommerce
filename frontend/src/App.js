import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Banner from './components/main/Banner';

import ProductList from './components/main/ProductList';
import ProductDetail from './components/main/ProductDetail';

import { CartProvider } from './contexts/CartContext';
import CartPage from './components/cart/CartPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
      <ToastContainer />
        <Header />

        <main className="flex-grow">
        <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <ProductList />
                </>
              }
            />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;