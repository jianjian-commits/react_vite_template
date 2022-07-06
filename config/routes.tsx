import { SmileOutlined } from '@ant-design/icons'
import type { RoutesType } from '@/routers/typings'
import Layout from '@/pages/layout'

/**
 * @description 以下配置将映射出路由和左侧菜单栏数据
 * @description 路由逻辑在 src/routes
 * @description 左侧菜单逻辑在 utils/routersToMenus
 * @description 你可以通过element(不会懒加载)引入页面 也可以通过component(懒加载)
 * @description 请严格遵守 不然容易死循环了
 */

// TODO 路由待优化
export const routes: RoutesType = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/detail',
    redirect: '/detail/sub',
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        icon: <SmileOutlined />,
        name: '首页',
        component: () => import('@/pages/home'),
        meta: {
          access: 'home',
        },
      },
      {
        path: '/detail',
        icon: <SmileOutlined />,
        name: '详情',
        children: [
          {
            path: '/detail/sub',
            name: '一级页面',
            icon: <SmileOutlined />,
            component: () => import('@/pages/detail/index'),
            meta: {
              access: 'detail/sub1',
            },
          },
          {
            path: '/detail/sub2',
            name: '二级页面',
            icon: <SmileOutlined />,
            component: () => import('@/pages/jianjian/index'),
            meta: {
              access: 'detail/sub2',
            },
          },
        ],
      },
      {
        path: '/jianjian',
        icon: <SmileOutlined />,
        name: 'jianjian',
        children: [
          {
            path: '/jianjian/1',
            name: 'jianjian1',
            icon: <SmileOutlined />,
            component: () => import('@/pages/jianjian/index'),
            meta: {
              access: 'jianjian/1',
            },
          },
          {
            path: '/jianjian/2',
            name: 'jianjian2',
            icon: <SmileOutlined />,
            component: () => import('@/pages/jianjian2/index'),
            meta: {
              access: 'jianjian/2',
            },
          },
        ],
      },
      {
        path: '/403',
        component: () => import('@/pages/noPermisson'),
      },
      {
        path: '/404',
        component: () => import('@/pages/noFound'),
      },
    ],
  },
  {
    path: '/bigScreen',
    component: () => import('@/pages/jianjian/index'),
  },
  {
    path: '/login',
    component: () => import('@/pages/login/index'),
    meta: {
      public: true,
    },
  },
]
