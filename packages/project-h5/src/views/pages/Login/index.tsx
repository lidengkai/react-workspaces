import { memo, useEffect, useMemo } from 'react';
import styles from './style.less';
import { useDispatch, useSelector } from 'react-redux';
import { FormInterface } from '~/flow/pages/login/interface';
import { destroy } from '~/flow/pages/login/reducer';
import { fetchUserLogin } from '~/flow/pages/login/actions';
import { Button, Dialog, Form, Input } from 'antd-mobile';
import { Controller, UseControllerProps, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<FormInterface>({
    defaultValues: {
      username: 'admin',
      password: '123456',
    },
    mode: 'onChange',
  });

  const controllers = useMemo<{
    username: UseControllerProps<FormInterface, 'username'>;
    password: UseControllerProps<FormInterface, 'password'>;
  }>(() => {
    return {
      username: {
        name: 'username',
        control: form.control,
        rules: {
          required: '用户名不能为空',
        },
      },
      password: {
        name: 'password',
        control: form.control,
        rules: {
          required: '密码不能为空',
        },
      },
    };
  }, []);

  const submit = form.handleSubmit(async (values: FormInterface) => {
    try {
      const res = await dispatch(fetchUserLogin(values)).unwrap();
      if (res) {
        navigate('/', { replace: true });
      }
    } catch {}
  });

  const { errors } = form.formState;

  const loading = useSelector((state) => state.login.loading);

  useEffect(() => {
    return () => {
      dispatch(destroy());
    };
  }, []);

  return (
    <>
      <Dialog
        visible
        content={
          <Form
            layout="horizontal"
            onFinish={submit}
            footer={
              <Button block type="submit" color="primary" loading={loading}>
                登录
              </Button>
            }
          >
            <Controller
              {...controllers.username}
              render={({ field: { value, onChange } }) => (
                <Form.Item>
                  <Input
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder="请输入用户名"
                    autoComplete="off"
                  />
                  <div className={styles.error}>{errors.username?.message}</div>
                </Form.Item>
              )}
            />
            <Controller
              {...controllers.password}
              render={({ field: { value, onChange } }) => (
                <Form.Item>
                  <Input
                    value={value}
                    onChange={onChange}
                    type="password"
                    placeholder="请输入密码"
                    autoComplete="off"
                  />
                  <div className={styles.error}>{errors.password?.message}</div>
                </Form.Item>
              )}
            />
          </Form>
        }
      />
    </>
  );
});

export default Login;
