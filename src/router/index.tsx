

import { RouteObject } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import PageNotFoundView from '@/compoments/PageNotFoundView';
import Test from '@/compoments/Test';
import Loading from '@/compoments/Loading';
import DappTest from '@/pages/DappTest'
import AiChat from '@/pages/AiChat';
import { lazy, Suspense } from 'react';
import Home from '@pages/Home';

const Routes: RouteObject[] = [];

const mainRoutes = {
    path: '/',
    element: <Layout />,
    children: [
      { path: '*', element: <PageNotFoundView /> },
      { path: '/dapp', element: <DappTest /> },
      { path: '/aiChat', element: <AiChat /> },
      { path: '/', element: <Home /> },
      { path: '404', element: <PageNotFoundView /> },
    ],
  };


  const DemoRoutes = {
    path: 'yideng',
    element: <Layout />,
    children: [{ path: 'test', element: <Test /> }],
  };

  Routes.push(mainRoutes, DemoRoutes);

  export default Routes;