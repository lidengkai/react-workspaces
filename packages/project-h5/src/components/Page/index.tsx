import { memo } from 'react';
import classNames from 'classnames';
import styles from './style.less';
import { NavBar } from 'antd-mobile';
import useBack, { UseBackProps } from '~/hooks/useBack';

export interface PageProps extends UseBackProps {
  className?: string;
  style?: CSSProperties;
  header?: ReactNode;
  hideBack?: boolean;
  extra?: ReactNode;
  footer?: ReactNode;
}

const Page = memo((props: PageProps & WithChildren) => {
  const onBack = useBack(props);
  const {
    className,
    style,
    children,
    header,
    hideBack = false,
    extra,
    footer,
  } = props;

  return (
    <div className={classNames(styles.root, className)} style={style}>
      <NavBar
        className={styles.nav}
        back={hideBack ? null : undefined}
        onBack={onBack}
        right={extra}
      >
        {header}
      </NavBar>
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
});

export default Page;

declare namespace Page {
  type Props = Required<PageProps>;
}
