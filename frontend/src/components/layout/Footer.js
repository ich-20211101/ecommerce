import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <p className="text-sm">&copy; 2025 Suyeon’s Dessert Shop. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="/" className="hover:underline">Privacy Policy</a>
          <a href="/" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;