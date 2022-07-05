import React, { useEffect, useMemo, useState } from 'react'
import { Space } from 'antd'

import Avatar from './AvatarDropdown'
import styles from './index.module.less'

const GlobalHeaderRight: React.FC = () => {
  return (
    <Space className={styles.right}>
      <Avatar />
    </Space>
  )
}

export default GlobalHeaderRight
