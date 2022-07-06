import { Form, Input, Button, Checkbox } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { getRoutePath, getQueryObject } from '@/utils'
import { useSelector, useDispatch } from 'react-redux'
import { setUserInfo, setToken } from '@/store/globalReducer'
import './index.less'

export const fetchUserInfo = (params?: any) => {
  console.log(params)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        token: '123456789',
        ...params,
        hasPermission: ['home', 'detail/sub1'],
      })
    }, 2000)
  })
}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // url参数
  const query = getQueryObject()
  const redirectUrl = decodeURIComponent(query.redirectUrl || '')

  // form实例
  const [form] = Form.useForm()

  // 提交表单
  function onSubmit() {
    form
      .validateFields()
      .then((values) => {
        return fetchUserInfo({ ...values })
      })
      .then((data) => {
        dispatch(setUserInfo(data))
        dispatch(setToken((data as any).token))
        localStorage.setItem('userInfo', JSON.stringify(data))
        localStorage.setItem('token', JSON.stringify(123456789))
        if (redirectUrl) {
          const path = getRoutePath(redirectUrl, true)
          navigate(path)
        } else {
          navigate('/home')
        }
      })
  }

  return (
    <div className="v-login-index">
      <h4 className="title">后台管理系统</h4>

      <Form
        className="formWrap"
        name="login"
        form={form}
        size="large"
        initialValues={{ username: 'neo', password: '123456', remember: true }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <div className="moreWrap">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登录</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" className="loginBtn" onClick={onSubmit}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
