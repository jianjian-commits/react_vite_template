import { LikeOutlined, UserOutlined } from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import {
  PageContainer,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components'
import { Avatar, Button, Descriptions, Result, Space, Statistic } from 'antd'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useNavigate, useLocation, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RightContent from '@/pages/components/RightContent'
import { layoutConfig, routes } from '../../../config'
import { routersToMenus } from '@/utils'
import _ from 'lodash'
import { RoutesItemType, RoutesType } from '@/routers/typings'

export default memo(() => {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuList, setMenuList] = useState<RoutesItemType[]>([])
  const userInfo = useSelector((state) => {
    return (state as any).globalReducer?.userInfo
  })

  /** @description 过滤吃出children: []的菜单 */
  const filterMenu = (items: any[]): any => {
    return items.map((item) => {
      const newItem = { ...item }
      if (newItem.children && newItem.children?.length > 0) {
        filterMenu(newItem.children)
      } else if (item.children && item.children?.length === 0) {
        return
      }
      return newItem
    })
  }

  /** @description 更具权限筛选菜单 */
  const transformMenus = (routeList: RoutesItemType) => {
    const menuList: RoutesItemType[] = []
    _.forEach(routeList, (item) => {
      const newItem = { ...item }
      if (userInfo?.hasPermission?.includes(newItem.meta?.access)) {
        menuList.push(item)
      } else if (item.children?.length) {
        menuList.push({
          ...item,
          children: transformMenus(item.children),
        })
      }
    })
    return menuList
  }

  useEffect(() => {
    const newDataSource: RoutesType = [...routersToMenus(routes)]
    const newMenuList = transformMenus(newDataSource)
    setMenuList(filterMenu(newMenuList))
  }, [userInfo])

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        route={{
          routes: menuList,
        }}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              if (item.path !== location.pathname) {
                navigate(item.path || '/')
              }
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => <RightContent />}
        {...layoutConfig}
      >
        <Outlet />
      </ProLayout>
    </div>
  )
})
