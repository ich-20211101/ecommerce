// src/components/common/Toast.js
import React from 'react';

function Toast({ message, show }) {
  if (!show) return null;

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
}

export default Toast;