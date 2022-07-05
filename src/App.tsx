import { useRoutes, useNavigate, BrowserRouter } from 'react-router-dom'
import { routes } from '../config/routes'
import 'antd/dist/antd.css'
import '@ant-design/pro-components/dist/components.css'
import { useEffect } from 'react'

const App = () => {
  const isLogin = true
  const navigate = useNavigate()

  // 判断是否登陆 否则重定向到登陆界面
  useEffect(() => {
    if (!isLogin) {
      navigate('/login', { replace: true })
    }
  }, [isLogin])

  return useRoutes(routes)
}
export default App
