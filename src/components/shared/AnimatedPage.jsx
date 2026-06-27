import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLoadingBar } from '../layout/TopLoadingBar';

const animations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const AnimatedPage = ({ children }) => {
  const { done } = useLoadingBar();

  useEffect(() => {
    done();
  }, [done]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animations}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
