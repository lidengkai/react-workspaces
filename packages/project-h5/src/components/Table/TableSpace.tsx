import { memo, useCallback, useEffect, useRef } from 'react';
import styles from './style.less';
import useScrollInRange from '~/hooks/useScrollInRange';
import useCacheRef from '~/hooks/useCacheRef';
import { DotLoading } from 'antd-mobile';

export interface TableSpaceProps {
  size?: number;
  page: number;
  load(page: number, force?: boolean): Promise<any>;
}

const TableSpace = memo((props: TableSpaceProps) => {
  const { size, page, load } = props;
  const ref = useRef<HTMLTableSectionElement>(null);

  const pageRef = useCacheRef(page);
  const loadRef = useCacheRef(load);

  const onLoad = useCallback(async () => {
    await loadRef.current(pageRef.current);
  }, []);

  const run = useScrollInRange({ target: ref, onLoad });

  useEffect(() => {
    run();
  }, [page]);

  return (
    <tbody data-page={page} className={styles.tbody} ref={ref}>
      <tr className={styles.tr}>
        <td className={styles.td} colSpan={size}>
          <div className={styles.spaceContainer}>
            <div className={styles.space}>
              <DotLoading />
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
});

export default TableSpace;
