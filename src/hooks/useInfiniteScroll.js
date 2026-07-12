import { useCallback, useEffect, useRef, useState } from 'react';

const getErrorMessage = (error, fallbackMessage) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallbackMessage;
};

export const useInfiniteScroll = ({
  loader,
  fallbackErrorMessage = 'Unable to load data.',
}) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [nextPageToken, setNextPageToken] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  const sentinelRef = useRef(null);
  const isLoadingMoreRef = useRef(false);
  const loaderRef = useRef(loader);

  if (loader !== loaderRef.current) {
    loaderRef.current = loader;
    setItems([]);
    setNextPageToken(null);
    setIsLoading(true);
  }

  const loadInitial = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await loader(null);
      setItems(result.items);
      setNextPageToken(result.nextPageToken);
    } catch (error) {
      setItems([]);
      setNextPageToken(null);
      setErrorMessage(getErrorMessage(error, fallbackErrorMessage));
    } finally {
      setIsLoading(false);
    }
  }, [loader, fallbackErrorMessage]);

  const loadMore = useCallback(async () => {
    if (isLoadingMoreRef.current || !nextPageToken) {
      return;
    }

    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);

    try {
      const result = await loader(nextPageToken);
      setItems((prev) => [...prev, ...result.items]);
      setNextPageToken(result.nextPageToken);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, fallbackErrorMessage));
    } finally {
      setIsLoadingMore(false);
      isLoadingMoreRef.current = false;
    }
  }, [loader, nextPageToken, fallbackErrorMessage]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial, reloadToken]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          nextPageToken &&
          !isLoadingMoreRef.current
        ) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [nextPageToken, loadMore]);

  return {
    items,
    isLoading,
    isLoadingMore,
    errorMessage,
    hasMore: !!nextPageToken,
    sentinelRef,
    reload: () => {
      setReloadToken((current) => current + 1);
      setItems([]);
      setNextPageToken(null);
    },
  };
};
