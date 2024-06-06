// src/ScrollToTopButton.js

import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 250) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-10 right-10 px-3 py-2 rounded-full bg-stone-800 text-stone-50 shadow-lg hover:bg-stone-700 ${
        isVisible ? 'block' : 'hidden'
      }`}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
