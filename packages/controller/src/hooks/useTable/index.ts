import useTableHeader, { UseTableHeaderProps } from './useTableHeader';
import useTableBody, { UseTableBodyProps } from './useTableBody';

export interface UseTableProps<T extends any[]>
  extends UseTableHeaderProps<T>,
    UseTableBodyProps<T> {}

const useTable = <T extends any[]>(props: UseTableProps<T>) => {
  const theadConfig = useTableHeader(props);
  const tbodyConfig = useTableBody(props);
  return { theadConfig, tbodyConfig };
};

export default useTable;

declare namespace useTable {
  type Props<T extends any[]> = Required<UseTableProps<T>>;
}
