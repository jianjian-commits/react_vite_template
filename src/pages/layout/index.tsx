import { LikeOutlined, UserOutlined } from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import {
  PageContainer,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components'
import { Avatar, Button, Descriptions, Result, Space, Statistic } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import RightContent from '@/pages/components/RightContent'
import { layoutConfig, routes } from '../../../config'
import { routersToMenus } from '@/utils'

export default () => {
  const location = useLocation()
  const [pathname, setPathname] = useState(location.pathname)

  useEffect(() => {
    setPathname(location.pathname)
  }, [location.pathname])

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        route={{
          routes: routersToMenus(routes),
        }}
        location={{
          pathname,
        }}
        menuItemRender={(item, dom) => (
          <Link
            onClick={() => {
              setPathname(item.path || '/')
            }}
            to={item.path!}
          >
            {dom}
          </Link>
        )}
        rightContentRender={() => <RightContent />}
        {...layoutConfig}
      >
        <Outlet />
      </ProLayout>
    </div>
  )
}
