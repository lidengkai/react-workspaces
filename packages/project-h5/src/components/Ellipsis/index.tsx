import { memo, useCallback } from 'react';
import classNames from 'classnames';
import styles from './style.less';
import useEllipsis, { UseEllipsisProps } from '~/hooks/useEllipsis';

export interface EllipsisProps extends UseEllipsisProps {
  className?: string;
  style?: CSSProperties;
  operatorClassName?: string;
  operatorStyle?: string;
}

const Ellipsis = memo((props: EllipsisProps & WithChildren) => {
  const { rows, contentRef, spaceConfig, hasOperator, open, onChangeOpen } =
    useEllipsis(props);
  const { className, style, operatorClassName, children } = props;

  const handleClose = useCallback(() => {
    onChangeOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    onChangeOpen(true);
  }, []);

  return (
    <div className={classNames(styles.root, className)} style={style}>
      <div
        className={classNames(styles.content, { [styles.close]: !open })}
        style={{
          ['--ellipsis-rows' as any]: rows,
        }}
        ref={contentRef}
      >
        <div>
          {hasOperator && !open ? (
            <>
              {spaceConfig.map((key) => (
                <span className={styles.space} key={key}>
                  *
                </span>
              ))}
              <a
                className={classNames(operatorClassName, styles.more)}
                onClick={handleOpen}
              >
                查看更多
              </a>
            </>
          ) : null}
          <span>{children}</span>
          {hasOperator && open ? (
            <a className={classNames(operatorClassName)} onClick={handleClose}>
              收起
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default Ellipsis;

declare namespace Ellipsis {
  type Props = Required<EllipsisProps>;
}
