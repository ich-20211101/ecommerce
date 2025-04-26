import React from 'react';

function Banner() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1663839412124-3697b75810ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-55"></div>

      {/* Text */}
      <h1 className="relative text-4xl font-bold z-10">
        🍩 Life is Short, Eat Dessert First 🧁
      </h1>
    </div>
  );
}

export default Banner;