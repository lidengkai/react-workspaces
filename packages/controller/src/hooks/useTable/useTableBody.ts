import { useMemo } from 'react';

export interface UseTableBodyProps<T extends any[]> {
  columns?: Array<
    NonNullable<
      | {
          key: string;
          dataIndex?: never;
          render: (value: void, record: T[number], index: number) => ReactNode;
        }
      | {
          [K in keyof T[number]]: {
            key?: string;
            dataIndex: K;
            render?: (
              value: T[number][K],
              record: T[number],
              index: number
            ) => ReactNode;
          };
        }[keyof T[number]]
    > & {
      title?: ReactNode;
      sorter?: boolean;
      width?: number;
      fixed?: 'left' | 'right';
      align?: 'left' | 'right' | 'center';
      thClassName?: string;
      tdClassName?: string;
    }
  >;
  dataSource?: T;
  rowKey?:
    | string
    | number
    | ((record: T[number], index: number) => string | number);
}

const useTableBody = <T extends any[]>(props: UseTableBodyProps<T>) => {
  const { columns, dataSource, rowKey } = props;
  return useMemo(() => {
    return dataSource?.map((item, rowIndex) => {
      return {
        key:
          typeof rowKey === 'function'
            ? rowKey(item, rowIndex)
            : rowKey
            ? item[rowKey]
            : rowIndex,
        list: columns?.map((config, index) => {
          const {
            dataIndex,
            key = dataIndex,
            render,
            align = 'center',
            tdClassName,
            fixed,
          } = config;
          const value = dataIndex ? item[dataIndex] : undefined;
          return {
            key: (key as any) ?? index,
            node: render ? render(value, item, index) : value,
            align,
            className: tdClassName,
            fixed,
          };
        }),
      };
    });
  }, [columns, dataSource, rowKey]);
};

export default useTableBody;

declare namespace useTableBody {
  type Props<T extends any[]> = Required<UseTableBodyProps<T>>;
}
