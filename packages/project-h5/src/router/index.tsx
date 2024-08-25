import { lazy, Suspense } from 'react';
import { Navigate, createHashRouter } from 'react-router-dom';

const Layout = lazy(
  () => import(/* webpackChunkName: "Layout" */ '@/views/app/Layout')
);
const Login = lazy(
  () => import(/* webpackChunkName: "Login" */ '@/views/pages/Login')
);
const Test = lazy(
  () => import(/* webpackChunkName: "Test" */ '@/views/pages/Test')
);

const router = createHashRouter([
  {
    path: '',
    element: <Navigate to="h5" replace />,
  },
  {
    path: 'login',
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: 'h5',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Navigate to="test" replace />,
      },
      {
        path: 'test',
        element: <Test />,
      },
    ],
  },
  {
    path: '*',
    element: <>404</>,
  },
]);

export default router;
