import { memo } from 'react';
import classNames from 'classnames';
import styles from './style.less';
import { Button, Popup } from 'antd-mobile';
import Loading from '@/components/Loading';
import Page from '@/components/Page';

export interface SearchProps {
  className?: string;
  style?: CSSProperties;
  width?: string | number;
  /** 加载中 */
  loading?: boolean;
  /** 隐藏提交按钮 */
  hideOk?: boolean;
  /** 隐藏重置按钮 */
  hideInit?: boolean;
  title?: ReactNode;
  open?: boolean;
  onCancel?(): void;
  onInit?(): void;
  onOk?(): void;
}

const Search = memo((props: SearchProps & WithChildren) => {
  const {
    className,
    style,
    width,
    hideOk,
    hideInit,
    loading,
    title,
    open,
    onCancel,
    onInit,
    onOk,
    children,
  } = props;

  return (
    <Popup
      className={classNames(styles.root, className)}
      position="right"
      visible={open}
      onMaskClick={onCancel}
    >
      <Page
        className={classNames(styles.container, className)}
        style={{ width, ...style }}
        header={title}
        onBack={onCancel}
        footer={
          hideOk && hideInit ? null : (
            <div className={styles.footer}>
              {hideOk ? null : (
                <Button color="primary" disabled={loading} onClick={onOk}>
                  确定
                </Button>
              )}
              {hideInit ? null : (
                <Button disabled={loading} onClick={onInit}>
                  重置
                </Button>
              )}
            </div>
          )
        }
      >
        {children}
      </Page>
      <Loading show={loading} />
    </Popup>
  );
});

export default Search;

declare namespace Search {
  type Props = Required<SearchProps>;
}
