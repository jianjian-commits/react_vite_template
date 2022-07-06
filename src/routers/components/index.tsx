import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import Guard from './guard'
import _ from 'lodash'
import type { RouterWaiterPropsType, RoutesItemType } from '../typings'

export default class RouteConfig {
  routes
  onRouteBefore
  loading

  constructor(option: RouterWaiterPropsType) {
    this.routes = option.routes || []
    this.onRouteBefore = option.onRouteBefore
    this.loading = option.loading || <div>loading...</div>
  }

  /**
   * @description: 将路由配置列表数据转换为react-router-dom能需要的数据格式
   */
  transformRoutes(routeList = this.routes) {
    const list: RoutesItemType[] = []
    routeList.forEach((route) => {
      const obj = { ...route }
      if (obj.path === undefined) {
        return
      }
      if (obj.redirect) {
        obj.element = <Navigate to={obj.redirect} replace={true} />
      } else if (obj.component) {
        obj.element = this.lazyLoad(obj.component, obj.meta || {})
      }
      delete obj.redirect
      delete obj.component
      delete obj.meta
      if (obj.children) {
        obj.children = this.transformRoutes(obj.children)
      }
      list.push(obj)
    })
    return list
  }

  /**
   * @description: 路由懒加载
   */
  lazyLoad(importFn: any, meta: any) {
    const Element = React.lazy(importFn)
    const lazyElement = (
      <React.Suspense fallback={this.loading}>
        <Element _meta={meta} />
      </React.Suspense>
    )

    return (
      <Guard
        element={lazyElement}
        meta={meta}
        onRouteBefore={this.onRouteBefore}
      />
    )
  }
}
