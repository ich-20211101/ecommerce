import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Banner from './components/main/Banner';
import ProductList from './components/main/ProductList';
import ProductDetail from './components/main/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />

        <main className="flex-grow">
        <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />     {/* 💡 배너 먼저 나오게 */}
                  <ProductList />
                </>
              }
            />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;