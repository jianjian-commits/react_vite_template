import _ from 'lodash'
import { RoutesItemType } from '@/routers/typings'

/**
 * @description 根据路由表映射出左侧数据菜单栏
 * @param routeList 传入路由列表
 * @returns 得到左侧菜单栏数据
 */

export const routersToMenus = (routeList: RoutesItemType[]): any => {
  const newArr = _.filter(routeList, (item) => !item.redirect)
  const routeArr: RoutesItemType[] = []
  _.forEach(newArr, (route) => {
    const newRoute = { ...route }
    if (newRoute.path) {
      if (newRoute.path === '/' && newRoute.children?.length) {
        routeArr.push(...newRoute.children)
      } else {
        routeArr.push(newRoute)
      }
    }
  })

  return routeArr
}
