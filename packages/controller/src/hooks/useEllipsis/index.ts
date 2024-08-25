import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSize } from 'ahooks';
import useValue from '~/hooks/useValue';

export interface UseEllipsisProps extends ControllableValue<'open', boolean> {
  dependencyList: any[];
  rows?: number;
}

const useEllipsis = (props: UseEllipsisProps) => {
  const { dependencyList, rows = 1 } = props;

  const [open, onChangeOpen] = useValue(props, 'open', false);

  const [hasOperator, setHasOperator] = useState<boolean>(false);
  const [openVal, setOpenVal] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number>();

  const spaceConfig = useMemo(() => {
    const config: number[] = [];
    for (let index = 0, size = rows - 1; index < size; index++) {
      config.push(index);
    }
    return config;
  }, [rows]);

  const reset = useCallback(() => {
    timerRef.current && cancelAnimationFrame(timerRef.current);
    setHasOperator(false);
    setOpenVal(false);
    timerRef.current = requestAnimationFrame(() => {
      if (contentRef.current) {
        const { clientHeight, scrollHeight } = contentRef.current;
        setHasOperator(scrollHeight > clientHeight);
      }
    });
  }, []);

  const contentSize = useSize(contentRef);

  useEffect(() => {
    reset();
  }, [contentSize?.width, ...dependencyList]);

  useEffect(() => {
    if (hasOperator) {
      setOpenVal(open);
    }
  }, [hasOperator, open]);

  return {
    rows,
    contentRef,
    spaceConfig,
    hasOperator,
    open: openVal,
    onChangeOpen,
  };
};

export default useEllipsis;

declare namespace useEllipsis {
  type Props = Required<UseEllipsisProps>;
}
