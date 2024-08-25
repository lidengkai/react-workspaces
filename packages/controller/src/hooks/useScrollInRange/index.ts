import { RefObject, useCallback, useEffect, useRef } from 'react';
import { useDebounceFn } from 'ahooks';
import useCacheRef from '~/hooks/useCacheRef';
import getScrollTarget from '~/utils/getScrollTarget';
import targetIsInRange from '~/utils/targetIsInRange';

export interface UseScrollInRangeProps<T extends HTMLElement> {
  target: RefObject<T>;
  onLoad?(): void;
}

const useScrollInRange = <T extends HTMLElement>(
  props: UseScrollInRangeProps<T>
) => {
  const { target, onLoad } = props;
  const loadRef = useCacheRef(onLoad);
  const scrollTargetRef = useRef<HTMLElement | Window>();

  const handleLoad = useCallback(() => {
    if (scrollTargetRef.current) {
      if (targetIsInRange(target.current!, scrollTargetRef.current)) {
        loadRef.current?.();
      }
    }
  }, []);

  const { run: handleScroll } = useDebounceFn(handleLoad, {
    wait: 500,
  });

  useEffect(() => {
    if (target.current) {
      scrollTargetRef.current = getScrollTarget(target.current);
      scrollTargetRef.current.addEventListener('scroll', handleScroll, false);
    }
    return () => {
      scrollTargetRef.current?.removeEventListener(
        'scroll',
        handleScroll,
        false
      );
    };
  }, []);

  return handleLoad;
};

export default useScrollInRange;

declare namespace useScrollInRange {
  type Props<T extends HTMLElement> = Required<UseScrollInRangeProps<T>>;
}
