import { memo, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './style.less';
import useTableBody, { UseTableBodyProps } from '~/hooks/useTable/useTableBody';
import useScrollInRange from '~/hooks/useScrollInRange';
import useCacheRef from '~/hooks/useCacheRef';

export interface TableBodyProps<T extends any[]> extends UseTableBodyProps<T> {
  page: number;
  load(page: number, force?: boolean): Promise<any>;
  wait: boolean;
  loading: boolean;
}

const TableBody = memo((props: TableBodyProps<any>) => {
  const { page, load, wait, loading, ...tableProps } = props;
  const tbodyConfig = useTableBody(tableProps);
  const ref = useRef<HTMLTableSectionElement>(null);

  const pageRef = useCacheRef(page);
  const loadRef = useCacheRef(load);

  const onLoad = useCallback(async () => {
    await loadRef.current(pageRef.current);
  }, []);

  const run = useScrollInRange({ target: ref, onLoad });

  useEffect(() => {
    if (wait) {
      run();
    }
  }, [wait]);

  return (
    <tbody data-page={page} className={styles.tbody} ref={ref}>
      {tbodyConfig?.map((trItem) => {
        return (
          <tr className={styles.tr} key={trItem.key}>
            {trItem.list?.map((item) => {
              return (
                <td
                  className={classNames(
                    styles.td,
                    styles[item.align + 'Align'],
                    item.fixed && {
                      [styles[item.fixed + 'Fixed']]: item.fixed,
                    },
                    item.className
                  )}
                  key={item.key}
                >
                  {item.node}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
});

export default TableBody;
