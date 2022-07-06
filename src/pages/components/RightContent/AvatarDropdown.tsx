import React, { useCallback } from 'react'
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Menu, Spin } from 'antd'
import { useDispatch } from 'react-redux'
import { clearUserInfo, clearUserToken } from '@/store/globalReducer'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.module.less'

import type { MenuInfo } from 'rc-menu/lib/interface'

export type GlobalHeaderRightProps = {
  menu?: boolean
}

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  // 退出登录时清理cookie
  console.log('退出。。。')
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const dispatch = useDispatch()

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event
      console.log(key)

      if (key === 'logout') {
        // setInitialState((s) => ({ ...s, currentUser: undefined }));
        dispatch(clearUserInfo())
        dispatch(clearUserToken())
        localStorage.clear()
        loginOut()
        return
      }
      // history.push(`/account/${key}`);
    },
    // [setInitialState],
    []
  )

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  )

  // if (!initialState) {
  //   return loading;
  // }

  // const { currentUser } = initialState;

  // if (!currentUser || !currentUser.name) {
  //   return loading;
  // }

  const menuItems: MenuProps['items'] = [
    {
      label: '个人中心',
      key: 'center',
      icon: <UserOutlined />,
    },
    {
      label: '个人设置',
      key: 'settings',
      icon: <SettingOutlined />,
    },
    {
      label: '退出登录',
      key: 'logout',
      icon: <LogoutOutlined />,
    },
  ]

  const menuHeaderDropdown = (
    <Menu
      className={styles.menu}
      selectedKeys={[]}
      onClick={onMenuClick}
      items={menuItems}
    />
  )
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>jianjian</span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
