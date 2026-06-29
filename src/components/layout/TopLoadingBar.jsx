import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material';

const LoadingBarContext = createContext(null);

export const useLoadingBar = () => {
  const ctx = useContext(LoadingBarContext);
  return ctx ?? { start() {}, done() {} };
};

export const LoadingBarProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const hasCompleted = useRef(false);
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const done = useCallback(() => {
    hasCompleted.current = true;
    clearTimer();
    setProgress(100);
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 400);
  }, []);

  const start = useCallback(() => {
    hasCompleted.current = false;
    clearTimer();
    setProgress(0);
    setVisible(true);
    requestAnimationFrame(() => {
      if (!hasCompleted.current) {
        setProgress(30);
      }
    });
    timerRef.current = setTimeout(() => {
      if (!hasCompleted.current) {
        setProgress(70);
      }
    }, 400);
  }, []);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      start();
      timerRef.current = setTimeout(done, 3000);
    }
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const theme = useTheme();
  const barColor = theme.palette.primary.main;

  return (
    <LoadingBarContext.Provider value={{ start, done }}>
      {visible && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: 3,
            backgroundColor: barColor,
            zIndex: 9999,
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      )}
      {children}
    </LoadingBarContext.Provider>
  );
};
