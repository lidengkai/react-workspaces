import { StateInterface } from './interface';

export const name = 'test';

export const initialState: StateInterface = {
  loading: false,
  current: 1,
  pageSize: 20,
  sort: undefined,
  order: undefined,
  search: {
    show: false,
    value: {
      name: '',
      status: [],
    },
  },
  infoModal: {
    show: false,
    data: {
      type: 'info',
      id: undefined,
    },
  },
};
