import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useCacheRef from '~/hooks/useCacheRef';

export interface UseBackProps {
  onBack?(): void;
}

const useBack = (props: UseBackProps) => {
  const navigate = useNavigate();

  const { onBack } = props;

  const backRef = useCacheRef(onBack);

  return useCallback(() => {
    if (typeof backRef.current === 'function') {
      return backRef.current();
    }
    navigate(-1);
  }, []);
};

export default useBack;

declare namespace useBack {
  type Props = Required<UseBackProps>;
}
