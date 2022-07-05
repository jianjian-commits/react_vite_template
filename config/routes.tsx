import { lazy, Suspense, ReactNode } from 'react'
import Layout from '@/pages/layout'
import { Route } from '@ant-design/pro-layout/lib/typings'
import { SmileOutlined } from '@ant-design/icons'
import { Navigate } from 'react-router-dom'

interface RouteProps extends Route {
  element?: ReactNode
  children?: RouteProps[]
}

const Home = lazy(() => import('@/pages/home'))
const Detail = lazy(() => import('@/pages/detail'))
const Login = lazy(() => import('@/pages/login'))
const Jianjian = lazy(() => import('@/pages/jianjian'))
const Jianjian2 = lazy(() => import('@/pages/jianjian2'))

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<>loading...</>}>{children}</Suspense>
}

export const routes: RouteProps[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        name: '首页',
        icon: <SmileOutlined />,
        element: lazyLoad(<Home />),
      },
      {
        path: '/detail',
        name: '详情',
        icon: <SmileOutlined />,
        element: lazyLoad(<Detail />),
      },

      {
        path: '/jianjian',
        name: 'jianjian',
        icon: <SmileOutlined />,
        children: [
          {
            path: '/jianjian/1',
            name: 'jianjian1',
            element: lazyLoad(<Jianjian />),
          },
          {
            path: '/jianjian/2',
            name: 'jianjian2',
            element: lazyLoad(<Jianjian2 />),
          },
          {
            path: '/jianjian/3',
            name: 'jianjian3',
            element: lazyLoad(<Jianjian2 />),
          },
          {
            path: '/jianjian',
            parentKeys: ['/jianjian/1'],
            element: <Navigate to="/jianjian/1" />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: lazyLoad(<Login />),
  },
]

// https://gitee.com/hollyWork/react-router-dom6-user-manage-center/repository/archive/master.zip
