import { useCallback, useRef, useState } from 'react';
import useCacheRef from '~/hooks/useCacheRef';

interface PageInfo<T> {
  page: number;
  loading: boolean;
  data: T | undefined;
  wait: boolean;
  time: number;
  error: any;
}

export interface UsePaginationProps<T> {
  pageSize?: number;
  onLoad?(
    page: number,
    pageSize: number
  ): Promise<{
    page?: number;
    total?: number;
    data?: T;
  }>;
  refreshTime?: number;
}

const usePagination = <T>(props: UsePaginationProps<T>) => {
  const { pageSize = 20, onLoad, refreshTime } = props;
  const pageSizeRef = useCacheRef(pageSize);
  const loadRef = useCacheRef(onLoad);
  const refreshTimeRef = useCacheRef(refreshTime);
  const infoRef = useRef<{
    total: number;
    dataSourceMap: Record<number, PageInfo<T>>;
  }>({
    total: Infinity,
    dataSourceMap: {},
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [hasPrev, setHasPrev] = useState<{ show: boolean; page: number }>({
    show: false,
    page: 0,
  });
  const [hasMore, setHasMore] = useState<{ show: boolean; page: number }>({
    show: false,
    page: 0,
  });
  const [total, setTotal] = useState<number>(0);
  const [dataSource, setDataSource] = useState<PageInfo<T>[]>([]);
  const updateState = useCallback(() => {
    const { total, dataSourceMap } = infoRef.current;
    const maxPage = Math.max(Math.ceil(total / pageSizeRef.current) || 0, 1);
    const result: PageInfo<T>[] = [];
    const first = dataSourceMap[0];
    if (first?.page) {
      for (let index = first.page; index <= maxPage; index++) {
        const item = dataSourceMap[index];
        if (!item) {
          break;
        }
        result.push(item);
      }
      for (let index = first.page - 1; index > 0; index--) {
        const item = dataSourceMap[index];
        if (!item) {
          break;
        }
        result.unshift(item);
      }
      const prevPage = (result[0]?.page || 0) - 1;
      const morePage = (result[result.length - 1]?.page || 0) + 1;
      setHasPrev({ show: prevPage > 0, page: prevPage });
      setHasMore({ show: morePage <= maxPage, page: morePage });
      setTotal(total);
      setDataSource(result);
      setLoading(result.some((item) => item.loading));
    } else {
      setHasPrev({ show: false, page: 0 });
      setHasMore({ show: maxPage > 1, page: 0 });
      setTotal(0);
      setDataSource([]);
      setLoading(false);
    }
  }, []);
  const createItem = useCallback((page: number): PageInfo<T> => {
    return {
      page,
      loading: true,
      data: undefined,
      wait: true,
      time: 0,
      error: undefined,
    };
  }, []);
  const load = useCallback(async (page: number, force?: boolean) => {
    if (loadRef.current) {
      try {
        const item = infoRef.current.dataSourceMap[page];
        if (item) {
          if (!force && !(item.wait && !item.loading)) {
            return;
          }
          item.loading = true;
        } else {
          infoRef.current.dataSourceMap[page] = createItem(page);
        }
        updateState();
        const res = await loadRef.current(page, pageSizeRef.current);
        const {
          page: nextPage = Math.max(page, 1),
          total = 0,
          data,
        } = res || {};
        infoRef.current.dataSourceMap[nextPage] = {
          page: nextPage,
          loading: false,
          data,
          wait: false,
          time: Date.now(),
          error: undefined,
        };
        if (nextPage !== page) {
          infoRef.current.dataSourceMap[page] = {
            ...infoRef.current.dataSourceMap[nextPage],
          };
        }
        infoRef.current.total = total;
        updateState();
        if (refreshTimeRef.current) {
          setTimeout(() => {
            if (infoRef.current.dataSourceMap[nextPage]) {
              infoRef.current.dataSourceMap[nextPage].wait = true;
              updateState();
            }
          }, refreshTimeRef.current);
        }
      } catch (e) {}
    }
  }, []);
  const refresh = useCallback((force?: boolean) => {
    if (force) {
      infoRef.current = {
        total: Infinity,
        dataSourceMap: {},
      };
    } else {
      for (const key in infoRef.current.dataSourceMap) {
        infoRef.current.dataSourceMap[key].wait = true;
      }
    }
    updateState();
  }, []);
  return {
    loading,
    hasPrev,
    hasMore,
    total,
    dataSource,
    load,
    refresh,
  };
};

export default usePagination;

declare namespace usePagination {
  type Props<T extends HTMLElement> = Required<UsePaginationProps<T>>;
}
