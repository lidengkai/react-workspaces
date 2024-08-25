import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateInterface } from '~/flow/pages/test/interface';
import { commitSearch } from '~/flow/pages/test/reducer';
import { Checkbox, Form, Input, Space } from 'antd-mobile';
import { FilterOutline } from 'antd-mobile-icons';
import { Controller, useForm } from 'react-hook-form';
import Modal from '@/components/Modal';

type SearchFormType = StateInterface['search']['value'];

const TestSearch = memo(() => {
  const dispatch = useDispatch();

  const show = useSelector((state) => state.test.search.show);
  const value = useSelector((state) => state.test.search.value);

  const form = useForm<SearchFormType>({
    defaultValues: { name: '', status: [] },
    mode: 'onChange',
  });

  const resetSearch = useCallback(() => {
    form.reset();
  }, []);

  const openSearch = useCallback(() => {
    dispatch(commitSearch({ show: true }));
  }, []);

  const closeSearch = useCallback(() => {
    dispatch(commitSearch({ show: false }));
  }, []);

  const submitSearch = form.handleSubmit((value: SearchFormType) => {
    dispatch(commitSearch({ show: false, value }));
  });

  useEffect(() => {
    if (show) {
      form.setValue('name', value.name);
      form.setValue('status', value.status);
    } else {
      form.reset();
      form.clearErrors();
    }
  }, [show]);

  return (
    <>
      <FilterOutline onClick={openSearch} />
      <Modal
        width="70vw"
        open={show}
        onCancel={closeSearch}
        onInit={resetSearch}
        onOk={submitSearch}
      >
        <Form layout="vertical">
          <Controller
            control={form.control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="名称">
                <Input
                  value={value}
                  onChange={onChange}
                  type="text"
                  placeholder="名称"
                  autoComplete="off"
                />
              </Form.Item>
            )}
          />
          <Controller
            control={form.control}
            name="status"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="状态">
                <Checkbox.Group value={value} onChange={onChange}>
                  <Space>
                    <Checkbox value={1}>启用</Checkbox>
                    <Checkbox value={0}>暂停</Checkbox>
                  </Space>
                </Checkbox.Group>
              </Form.Item>
            )}
          />
        </Form>
      </Modal>
    </>
  );
});

export default TestSearch;
