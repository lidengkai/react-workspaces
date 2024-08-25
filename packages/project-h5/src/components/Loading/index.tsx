import { memo } from 'react';
import classNames from 'classnames';
import styles from './style.less';
import { SpinLoading } from 'antd-mobile';

export interface LoadingProps {
  className?: string;
  style?: CSSProperties;
  show?: boolean;
}

const Loading = memo((props: LoadingProps) => {
  const { className, style, show } = props;

  if (!show) {
    return null;
  }

  return (
    <div className={classNames(styles.root, className)} style={style}>
      <SpinLoading className={styles.icon} />
    </div>
  );
});

export default Loading;

declare namespace Loading {
  type Props = Required<LoadingProps>;
}
