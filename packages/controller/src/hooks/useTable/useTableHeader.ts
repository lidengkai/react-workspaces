import { useMemo } from 'react';
import useCacheRef from '~/hooks/useCacheRef';
import { UseTableBodyProps } from './useTableBody';

export interface UseTableHeaderProps<T extends any[]> {
  columns?: UseTableBodyProps<T>['columns'];
  sort?: string;
  order?: 'desc' | 'asc';
  onChange?(sort?: string, order?: 'desc' | 'asc'): void;
}

const useTableHeader = <T extends any[]>(props: UseTableHeaderProps<T>) => {
  const { columns, sort, order, onChange } = props;
  const changeRef = useCacheRef(onChange);
  return useMemo(() => {
    return columns?.map((item, index) => {
      const {
        dataIndex,
        key = dataIndex,
        title,
        width,
        align = 'center',
        thClassName,
        fixed,
        sorter,
      } = item;
      const sorterInfo = sorter
        ? {
            order: sort === dataIndex ? order : undefined,
          }
        : (false as const);
      const click = sorterInfo
        ? () => {
            changeRef.current?.(
              key as any,
              sorterInfo.order === 'asc'
                ? 'desc'
                : sorterInfo.order === 'desc'
                ? undefined
                : 'asc'
            );
          }
        : undefined;
      return {
        key: (key as any) ?? index,
        node: title,
        width,
        align,
        className: thClassName,
        fixed,
        sorter: sorterInfo,
        click,
      };
    });
  }, [columns, sort, order]);
};

export default useTableHeader;

declare namespace useTableHeader {
  type Props<T extends any[]> = Required<UseTableHeaderProps<T>>;
}
