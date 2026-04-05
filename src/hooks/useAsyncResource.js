import { useEffect, useRef, useState } from 'react';

const getErrorMessage = (error, fallbackMessage) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
};

export const useAsyncResource = ({
  loader,
  initialData,
  fallbackErrorMessage = 'Unable to load data.',
}) => {
  const initialDataRef = useRef(initialData);
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadResource = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const nextData = await loader();

        if (isMounted) {
          setData(nextData);
        }
      } catch (error) {
        if (isMounted) {
          setData(initialDataRef.current);
          setErrorMessage(getErrorMessage(error, fallbackErrorMessage));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadResource();

    return () => {
      isMounted = false;
    };
  }, [fallbackErrorMessage, loader, reloadToken]);

  return {
    data,
    isLoading,
    errorMessage,
    reload: () => setReloadToken((current) => current + 1),
  };
};
