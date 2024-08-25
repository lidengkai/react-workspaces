import { useEffect, useRef } from 'react';

const useCacheRef = <T>(data: T) => {
  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);
  return dataRef;
};

export default useCacheRef;

declare namespace useCacheRef {}
