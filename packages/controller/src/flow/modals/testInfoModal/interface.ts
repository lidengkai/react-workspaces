export interface StateInterface {
  /** 加载中 */
  loading: boolean;
  type: 'add' | 'edit' | 'info';
  id: number | undefined;
}

export interface FormInterface {
  name: string;
  value: string;
}
