import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './style.less';
import { useDispatch, useSelector } from 'react-redux';
import { commit, commitInfo, destroy } from '~/flow/pages/test/reducer';
import {
  fetchTestDelete,
  fetchTestList,
  fetchTestModify,
} from '~/flow/pages/test/actions';
import { TestItem } from '~/types/test';
import { Space, Switch } from 'antd-mobile';
import { AddOutline } from 'antd-mobile-icons';
import Page from '@/components/Page';
import Table from '@/components/Table';
import Link from '@/components/Link';
import TestModal from '@/views/modals/TestModal';
import TestSearch from './modules/TestSearch';
import Loading from '@/components/Loading';

const Test = memo(() => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.test.loading);
  const sort = useSelector((state) => state.test.sort);
  const order = useSelector((state) => state.test.order);
  const current = useSelector((state) => state.test.current);
  const pageSize = useSelector((state) => state.test.pageSize);
  const search = useSelector((state) => state.test.search);
  const infoModal = useSelector((state) => state.test.infoModal);

  const tableRef = useRef<Table.Ref>(null);

  const columns = useMemo(
    (): Table.Props<TestItem[]>['columns'] => [
      {
        key: 'id',
        dataIndex: 'id',
        title: 'ID',
        fixed: 'left',
      },
      {
        dataIndex: 'name',
        title: '名称',
      },
      {
        dataIndex: 'status',
        title: '状态',
        render: (value, record) => {
          return value == 1 || value == 0 ? (
            <Link onClick={() => updateStatus(record, value ^ 1)}>
              <a>
                <Switch
                  checked={value == 1}
                  checkedText="启动"
                  uncheckedText="暂停"
                />
              </a>
            </Link>
          ) : null;
        },
      },
      {
        dataIndex: 'value',
        title: '值',
        sorter: true,
      },
      {
        key: 'operate',
        dataIndex: 'id',
        title: '操作',
        fixed: 'right',
        render: (_, record) => {
          return (
            <>
              <Link onClick={() => openShowInfo(record)}>
                <a>查看</a>
              </Link>
              <Link>|</Link>
              <Link onClick={() => openEditInfo(record)}>
                <a>编辑</a>
              </Link>
              <Link>|</Link>
              <Link
                comfirm="删除后不可恢复，确定要删除吗?"
                onClick={() => deleteItem(record)}
              >
                <a>删除</a>
              </Link>
            </>
          );
        },
      },
    ],
    []
  );

  const loadTestList = useCallback<Table.Props<TestItem[]>['onLoad']>(
    async (current: number) => {
      const res = await dispatch(fetchTestList(current || 1)).unwrap();
      const { total, list, page } = res;
      return {
        total,
        data: list,
        page,
      };
    },
    []
  );

  const changeTable = useCallback<Table.Props<TestItem[]>['onChange']>(
    (sort, order) => {
      dispatch(commit({ sort, order }));
      tableRef.current?.refresh();
    },
    []
  );

  const updateStatus = useCallback(async (item: TestItem, status: number) => {
    if (item.id) {
      try {
        const res = await dispatch(
          fetchTestModify({ id: item.id, status })
        ).unwrap();
        if (res) {
          tableRef.current?.refresh();
        }
      } catch (e) {}
    }
  }, []);

  const deleteItem = useCallback(async (item: TestItem) => {
    if (item.id) {
      try {
        const res = await dispatch(fetchTestDelete(item.id)).unwrap();
        if (res) {
          tableRef.current?.refresh();
        }
      } catch (e) {}
    }
  }, []);

  const openAddInfo = useCallback(async () => {
    dispatch(commitInfo({ show: true, data: { type: 'add', id: undefined } }));
  }, []);

  const openShowInfo = useCallback(async (item: TestItem) => {
    if (item.id) {
      dispatch(commitInfo({ show: true, data: { type: 'info', id: item.id } }));
    }
  }, []);

  const openEditInfo = useCallback(async (item: TestItem) => {
    if (item.id) {
      dispatch(commitInfo({ show: true, data: { type: 'edit', id: item.id } }));
    }
  }, []);

  const closeInfo = useCallback(() => {
    dispatch(commitInfo({ show: false }));
  }, []);

  const submitInfo = useCallback(() => {
    dispatch(commitInfo({ show: false }));
    tableRef.current?.refresh(true);
  }, []);

  useEffect(() => {
    tableRef.current?.refresh(true);
  }, [search.value]);

  useEffect(() => {
    return () => {
      dispatch(destroy());
    };
  }, []);

  return (
    <>
      <Page
        header="组件/表格"
        extra={
          <Space>
            <AddOutline onClick={openAddInfo} />
            <TestSearch />
          </Space>
        }
        hideBack
      >
        <Table
          ref={tableRef}
          className={styles.table}
          columns={columns}
          rowKey="id"
          pageSize={pageSize}
          sort={sort}
          order={order}
          onLoad={loadTestList}
          onChange={changeTable}
        />
      </Page>
      <Loading show={loading} />
      <TestModal
        show={infoModal.show}
        type={infoModal.data.type}
        id={infoModal.data.id}
        onClose={closeInfo}
        onSubmit={submitInfo}
      />
    </>
  );
});

export default Test;
