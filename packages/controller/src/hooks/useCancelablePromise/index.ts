import { useCallback, useRef } from 'react';
import { cancelable, CancelablePromise } from 'cancelable-promise';
import useCacheRef from '~/hooks/useCacheRef';

const useCancelablePromise = (callback: () => Promise<void>) => {
  const cancelRef = useRef<CancelablePromise>();

  const callbackRef = useCacheRef(callback);

  const cancel = useCallback(() => {
    cancelRef.current?.cancel();
  }, []);

  const run = useCallback(() => {
    cancel();
    cancelRef.current = cancelable(callbackRef.current());
  }, []);

  return {
    run,
    cancel,
  };
};

export default useCancelablePromise;
