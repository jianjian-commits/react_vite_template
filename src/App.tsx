import { BrowserRouter, Outlet } from 'react-router-dom'
import { routes } from '../config'
import 'antd/dist/antd.css'
import '@ant-design/pro-components/dist/components.css'
import RouterWaiter from './routers'
import { OnRouteBeforeType } from './routers/typings'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserInfo } from '@/pages/login'
import { setUserInfo } from './store/globalReducer'

const App = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => {
    return (state as any).globalReducer?.userInfo
  })
  console.log(userInfo, 'userInfo....')

  const onRouteBefore: OnRouteBeforeType = ({ pathname, meta }) => {
    console.log('走到勾子了...')

    if (userInfo.token) {
      if (!userInfo?.hasPermission?.length) {
        return new Promise((resolve, reject) => {
          fetchUserInfo({}).then((res) => {
            // 设置用户信息
            dispatch(setUserInfo(res))
            // 没有权限403
            if (!userInfo?.hasPermission?.includes(meta.access)) {
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
  return (
    <BrowserRouter basename="">
      <RouterWaiter routes={routes} onRouteBefore={onRouteBefore} />
    </BrowserRouter>
  )
}
export default App
