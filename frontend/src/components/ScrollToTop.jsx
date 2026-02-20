import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // මේකෙන් අපි දැනට ඉන්න Page එකේ URL (path) එක ගන්නවා
  const { pathname } = useLocation();

  useEffect(() => {
    // path එක වෙනස් වෙන හැම වෙලාවෙම (Page එක මාරු වෙද්දී) Screen එකේ උඩටම (0, 0) යනවා
    window.scrollTo(0, 0);
  }, [pathname]);

  // මේකෙන් මොකුත් UI එකක් පෙන්නන්නේ නැති නිසා null return කරනවා
  return null;
};

export default ScrollToTop;