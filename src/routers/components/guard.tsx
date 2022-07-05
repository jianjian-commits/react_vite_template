import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  ReactElementType,
  OnRouteBeforeType,
  OnRouteBeforeResType,
} from '../typings'
import { getDataType } from '@/utils'
import React from 'react'

interface Iprops {
  element: ReactElementType
  meta: any
  onRouteBefore?: OnRouteBeforeType
}

/** @description 路由加载前做的工作 */

const Guard: React.FC<Iprops> = ({ element, meta, onRouteBefore }) => {
  meta = meta || {}
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()

  if (onRouteBefore) {
    const pathRes = onRouteBefore({ pathname, meta })

    if (getDataType(pathRes) === 'Promise') {
      ;(pathRes as Promise<OnRouteBeforeResType>).then((res) => {
        if (res && res !== pathname) {
          navigate(res, { replace: true })
        }
      })
    } else {
      if (pathRes && pathRes !== pathname) {
        element = <Navigate to={pathRes as string} replace={true} />
      }
    }
  }
  return element
}

export default Guard
