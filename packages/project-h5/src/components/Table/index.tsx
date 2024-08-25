import {
  ForwardedRef,
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';
import styles from './style.less';
import { px } from '~/utils/view';
import TableSpace from './TableSpace';
import TableBody from './TableBody';
import { UseTableProps } from '~/hooks/useTable';
import useTableHeader from '~/hooks/useTable/useTableHeader';
import usePagination, { UsePaginationProps } from '~/hooks/usePagination';
import useTouch from '~/hooks/useTouch';
import { useSize } from 'ahooks';

export interface TableProps<T extends any[]>
  extends Omit<UseTableProps<T>, 'dataSource'>,
    UsePaginationProps<T> {
  className?: string;
  style?: CSSProperties;
}

export interface TableRef {
  refresh(force?: boolean): void;
}

const Table = memo(
  forwardRef((props: TableProps<any>, ref: ForwardedRef<TableRef>) => {
    const {
      className,
      style,
      // component: usePagination
      pageSize,
      onLoad,
      // component: useTable
      ...tableProps
    } = props;

    const theadConfig = useTableHeader(tableProps);

    const { hasMore, hasPrev, dataSource, load, refresh } = usePagination({
      pageSize,
      onLoad,
    });

    const tableRef = useRef<HTMLTableElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const tableSize = useSize(tableRef);
    const contentSize = useSize(contentRef);
    const minTranslate = useMemo(() => {
      return (contentSize?.width || 0) - (tableSize?.width || 0);
    }, [contentSize?.width, tableSize?.width]);

    const { translate, onTouchStart, onTouchMove, onTouchEnd } = useTouch({
      type: 'x',
      min: minTranslate,
      max: 0,
    });

    useImperativeHandle(ref, () => {
      return {
        refresh,
      };
    });

    return (
      <>
        <div
          ref={contentRef}
          className={classNames(styles.root, className)}
          style={style}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <table
            ref={tableRef}
            className={classNames(styles.table, {
              [styles.leftNear]: -translate < 2,
              [styles.rightNear]: minTranslate - translate > -2,
            })}
            style={{
              ['--table-translate' as any]: `${translate}px`,
              ['--table-translate-left' as any]: `${-translate}px`,
              ['--table-translate-right' as any]: `${
                minTranslate - translate
              }px`,
            }}
          >
            <colgroup>
              {theadConfig?.map((item) => {
                return (
                  <col
                    className={styles.col}
                    key={item.key}
                    style={{ minWidth: item.width && px(item.width) }}
                  ></col>
                );
              })}
            </colgroup>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                {theadConfig?.map((item) => {
                  return (
                    <th
                      className={classNames(
                        styles.th,
                        styles[item.align + 'Align'],
                        item.fixed && {
                          [styles[item.fixed + 'Fixed']]: item.fixed,
                        },
                        item.className
                      )}
                      key={item.key}
                      onClick={item.click}
                    >
                      <span>{item.node}</span>
                      {item.sorter ? (
                        <span className={styles.iconSorterContainer}>
                          <div
                            className={classNames(
                              styles.iconSorter,
                              item.sorter.order &&
                                styles[item.sorter.order + 'IconSorter']
                            )}
                          >
                            <div></div>
                            <div></div>
                          </div>
                        </span>
                      ) : null}
                    </th>
                  );
                })}
              </tr>
            </thead>
            {hasPrev.show ? (
              <TableSpace
                size={tableProps.columns?.length}
                page={hasPrev.page}
                load={load}
              />
            ) : null}
            {dataSource.map((item) => {
              return (
                <TableBody
                  key={item.page}
                  page={item.page}
                  dataSource={item.data}
                  wait={item.wait}
                  loading={item.loading}
                  load={load}
                  {...tableProps}
                />
              );
            })}
            {hasMore.show ? (
              <TableSpace
                size={tableProps.columns?.length}
                page={hasMore.page}
                load={load}
              />
            ) : null}
          </table>
        </div>
      </>
    );
  })
);

export default Table;

declare namespace Table {
  type Props<T extends any[]> = Required<TableProps<T>>;
  type Ref = TableRef;
}
