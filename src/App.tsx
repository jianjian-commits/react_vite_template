import { BrowserRouter, Outlet } from 'react-router-dom'
import { routes } from '../config'
import { message } from 'antd'
import 'antd/dist/antd.css'
import '@ant-design/pro-components/dist/components.css'
import RouterWaiter from './routers'
import { OnRouteBeforeType } from './routers/typings'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserInfo } from '@/pages/login'
import { setUserInfo } from './store/globalReducer'
import { useEffect } from 'react'

// TODO 刷新时候也应该调借口，这时候就会和onRouteBefore重叠调两次
const App = () => {
  const dispatch = useDispatch()
  const { userInfo, token } = useSelector((state) => {
    return (state as any).globalReducer
  })
  console.log(userInfo, 'userInfo....')

  message.config({
    maxCount: 1,
  })

  useEffect(() => {
    // fetchUserInfo({}).then((res: any) => {
    //   // 设置用户信息
    //   dispatch(setUserInfo(res))
    // })
  }, [])

  const onRouteBefore: OnRouteBeforeType = ({ pathname, meta }) => {
    console.log({
      pathname,
      meta,
    })
    console.log('走到勾子了...')
    // 如果配置了 pubilc像login这些界面就不需要往下走了
    if (meta.public) {
      return
    }

    if (token) {
      // 刷新了 调用用户信息接口
      if (!userInfo?.hasPermission?.length) {
        return new Promise((resolve, reject) => {
          fetchUserInfo({}).then((res: any) => {
            // 设置用户信息
            dispatch(setUserInfo(res))
            // 没有权限403
            if (!res?.hasPermission?.includes(meta.access)) {
              resolve('/403')
            }
          })
        })
      } else {
        if (!userInfo?.hasPermission?.includes(meta.access)) {
          return '/403'
        }
      }
    } else {
      return `/login?redirectUrl=${encodeURIComponent(window.location.href)}`
    }
  }
  return <RouterWaiter routes={routes} onRouteBefore={onRouteBefore} />
}
export default App
