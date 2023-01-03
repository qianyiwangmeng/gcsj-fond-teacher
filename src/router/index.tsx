import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../views/Home';
import Login from '../views/Login';

// const About = lazy(() => import("../views/About"))
// // const Home = lazy(() => import("../views/Home")) // 主页不用懒加载
// const User = lazy(() => import("../views/User"))

const Page1 = lazy(() => import('../views/Lab'));
const StudentList = lazy(() => import('../views/StudentList'));
const WeekList = lazy(() => import('../views/WeekList'));
const Details = lazy(() => import('../views/Details'));

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>
);

// add Loading component
const routes = [
  {
    path: '/',
    element: <Navigate to="/page1" />,
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/page1',
        element: withLoadingComponent(<Page1 />),
      },
      {
        path: '/studentList',
        element: withLoadingComponent(<StudentList />),
      },
      {
        path: '/weekList',
        element: withLoadingComponent(<WeekList />),
      },
      {
        path: '/details',
        element: withLoadingComponent(<Details />),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },

  // 访问其余路径的时候 直接跳到首页
  {
    path: '*',
    element: <Navigate to="/page1" />,
  },
];

export default routes;
