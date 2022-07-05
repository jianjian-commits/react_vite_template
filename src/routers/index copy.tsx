import React from 'react'
import { useRoutes } from 'react-router-dom'
import RouteConfig from './components'
import type { RouterWaiterPropsType } from './typings'
import type { RouteObject } from 'react-router-dom'

const RouterWaiter: React.FC<RouterWaiterPropsType> = ({
  routes,
  onRouteBefore,
  loading,
}) => {
  const reactRoutes = new RouteConfig({
    routes,
    onRouteBefore,
    loading,
  })
  console.log(reactRoutes.transformRoutes())

  const elements = useRoutes(reactRoutes.transformRoutes() as RouteObject[])

  return elements
}

export default RouterWaiter
