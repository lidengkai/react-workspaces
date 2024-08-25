import { memo, useCallback } from 'react';
import classNames from 'classnames';
import styles from './style.less';
import { Dialog } from 'antd-mobile';
import useCacheRef from '~/hooks/useCacheRef';

export interface LinkProps {
  className?: string;
  style?: CSSProperties;
  /** 点击事件、提交事件 */
  onClick?(): void;
  /** 二次确认 */
  comfirm?: ReactNode;
}

const Link = memo((props: LinkProps & WithChildren) => {
  const { className, style, children, onClick, comfirm } = props;

  const clickRef = useCacheRef(onClick);
  const comfirmRef = useCacheRef(comfirm);

  const click = useCallback(() => {
    if (comfirmRef.current) {
      return Dialog.confirm({
        content: comfirmRef.current,
        onConfirm: () => {
          clickRef.current?.();
        },
      });
    }
    clickRef.current?.();
  }, []);

  return (
    <span
      className={classNames(styles.link, className)}
      style={style}
      onClick={click}
    >
      {children}
    </span>
  );
});

export default Link;

declare namespace Link {
  type Props = Required<LinkProps>;
}
