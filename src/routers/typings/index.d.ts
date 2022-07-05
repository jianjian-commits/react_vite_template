import { Route } from '@ant-design/pro-layout/lib/typings'
import { RouteObject } from 'react-router-dom'

type ReactElementType = JSX.Element

interface RoutesItemType extends Route {
  redirect?: string
  element?: JSX.Element
  component?: () => Promise<any> | JSX.Element
  meta?: any
  children?: RoutesItemType[]
}

type RoutesType = RoutesItemType[]

type OnRouteBeforeResType = string | void

interface RouterWaiterPropsType {
  routes: RoutesType
  onRouteBefore?: OnRouteBeforeType
  loading?: ReactElementType
}

interface OnRouteBeforeType {
  (payload: { pathname: string; meta: any }):
    | OnRouteBeforeResType
    | Promise<OnRouteBeforeResType>
}

export type {
  RoutesItemType,
  RouterWaiterPropsType,
  RoutesType,
  ReactElementType,
  OnRouteBeforeType,
  OnRouteBeforeResType,
}
