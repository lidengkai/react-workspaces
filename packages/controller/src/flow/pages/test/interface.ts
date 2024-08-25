import { TestItem } from '~/types/test';

export interface StateInterface {
  /** 加载中 */
  loading: boolean;
  current: number;
  pageSize: number;
  sort: string | undefined;
  order: 'asc' | 'desc' | undefined;
  search: {
    show: boolean;
    value: {
      name: string;
      status: number[];
    };
  };
  infoModal: {
    show: boolean;
    data: {
      type: 'add' | 'edit' | 'info';
      id: number | undefined;
    };
  };
}
