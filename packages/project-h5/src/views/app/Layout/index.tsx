import { Suspense, memo, useEffect, useMemo } from 'react';
import styles from './style.less';
import { useDispatch, useSelector } from 'react-redux';
import { destroy } from '~/flow/app/reducer';
import { fetchUserInfo } from '~/flow/app/actions';
import { Outlet, useMatches } from 'react-router-dom';

const Layout = memo(() => {
  const matches = useMatches();
  const dispatch = useDispatch();

  const role = useSelector((state) => state.app.role);

  const auth = useMemo(() => {
    if (role) {
      return matches.every((item) => {
        const { auth } = (item.handle || {}) as { auth: number[] };
        return auth ? auth.includes(role) : true;
      });
    }
    return null;
  }, [role, matches]);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(destroy());
    };
  }, []);

  return (
    <>
      {auth ? (
        <Suspense>
          <Outlet />
        </Suspense>
      ) : null}
    </>
  );
});

export default Layout;
