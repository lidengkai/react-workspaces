import { memo, useCallback, useEffect, useMemo } from 'react';
import styles from './style.less';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormInterface,
  StateInterface,
} from '~/flow/modals/testInfoModal/interface';
import { commit, destroy } from '~/flow/modals/testInfoModal/reducer';
import {
  fetchTestCreate,
  fetchTestInfo,
  fetchTestModify,
} from '~/flow/modals/testInfoModal/actions';
import { Form, Input } from 'antd-mobile';
import { Controller, RegisterOptions, useForm } from 'react-hook-form';
import Modal from '@/components/Modal';

export type Props = Pick<StateInterface, 'type' | 'id'> & {
  show?: boolean;
  onClose?(): void;
  onSubmit?(values: FormInterface): void;
};

const TestModal = memo((props: Props) => {
  const dispatch = useDispatch();

  const { show, onClose, onSubmit } = props;

  const loading = useSelector((state) => state.testInfoModal.loading);
  const type = useSelector((state) => state.testInfoModal.type);

  const form = useForm<FormInterface>({
    defaultValues: {
      name: '',
      value: '',
    },
    mode: 'onChange',
  });

  const rules = useMemo<Record<keyof FormInterface, RegisterOptions>>(() => {
    return {
      name: {
        required: '名称不能为空',
        maxLength: {
          value: 10,
          message: '名称不能超过10个字',
        },
      },
      value: {
        required: '值不能为空',
        max: {
          value: 9999,
          message: '请输入0~9999之间的整数',
        },
      },
    };
  }, []);

  const submit = form.handleSubmit(async (values: FormInterface) => {
    try {
      const handleFetch =
        type === 'add'
          ? fetchTestCreate
          : type === 'edit'
          ? fetchTestModify
          : null;
      if (handleFetch) {
        const res = await dispatch(handleFetch(values)).unwrap();
        if (res) {
          onSubmit?.(values);
        }
      }
    } catch {}
  });

  const initForm = useCallback(async (id?: number) => {
    form.reset({
      name: '',
      value: '',
    });
    if (id) {
      try {
        const info = await dispatch(fetchTestInfo()).unwrap();
        form.reset({
          name: info?.name ?? '',
          value: info?.value ?? '',
        });
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (show) {
      const type = props.id && props.type !== 'add' ? props.type : 'add';
      const id = type === 'add' ? undefined : props.id;
      dispatch(commit({ type, id }));
      initForm(id);
    }
  }, [show]);

  useEffect(() => {
    return () => {
      dispatch(destroy());
    };
  }, []);

  const { errors } = form.formState;

  const title = useMemo(() => {
    if (type === 'add') {
      return '新增';
    }
    if (type === 'edit') {
      return '修改';
    }
    if (type === 'info') {
      return '查看';
    }
  }, [type]);

  return (
    <>
      <Modal
        title={title}
        open={show}
        loading={loading}
        onCancel={onClose}
        onOk={submit}
        hideOk={type === 'info'}
        hideInit
      >
        <Form>
          <Controller
            control={form.control}
            name="name"
            rules={rules.name}
            render={({ field: { value, onChange } }) => (
              <Form.Item label="名称" required>
                <Input
                  value={value}
                  onChange={onChange}
                  autoComplete="off"
                  readOnly={type === 'info'}
                  placeholder="请输入"
                />
                <div className={styles.error}>{errors.name?.message}</div>
              </Form.Item>
            )}
          />
          <Controller
            control={form.control}
            name="value"
            rules={rules.value}
            render={({ field: { value, onChange } }) => (
              <Form.Item label="值" required>
                <Input
                  value={value}
                  onChange={onChange}
                  type="number"
                  className={styles.number}
                  readOnly={type === 'info'}
                  placeholder="请输入"
                />
                <div className={styles.error}>{errors.value?.message}</div>
              </Form.Item>
            )}
          />
        </Form>
      </Modal>
    </>
  );
});

export default TestModal;
