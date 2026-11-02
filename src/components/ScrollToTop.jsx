import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Har page change par window ko top par le jao
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'smooth' bhi kar sakte ho agar animation chahiye
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;