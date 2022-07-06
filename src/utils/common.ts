/** @description 公共函数方法 */

/** @description 获取数据类型 */
const getDataType = (data: any): string => {
  return (
    Object.prototype.toString.call(data).match(/\s(\w+)\]/) as string[]
  )[1]
}

/**
 * @description: 根据url解析出路由path路径
 * @param {string} url 默认取当前页面地址
 * @param {boolean} isIncludeParams 是否需要包含路由参数，便于路由跳转携带数据
 * @return {string}
 */
const getRoutePath = (url = '', isIncludeParams = false) => {
  url = url || window.location.href
  const divideStr = '/'
  const reg = new RegExp(`//[\\w-\\.:]+${divideStr}(.*)*`)
  const match = url.match(reg) || []
  const pathWithParams = '/' + (match[1] || '')
  if (!isIncludeParams) {
    return pathWithParams
  } else {
    const path = pathWithParams.split('?')[0]
    return path
  }
}

/**
 * @description: 获取地址参数
 * @param {string} url 指定地址，默认取当前页地址
 * @return {string} { a: 1, b: 2, c: 3 }
 */
const getQueryObject = (url?: string) => {
  url =
    url ||
    (window === null || window === void 0 ? void 0 : window.location.href) ||
    ''
  const questionIndex = url.lastIndexOf('?')
  const obj: any = {}
  if (questionIndex > 0) {
    const search = url.substring(questionIndex + 1)
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, function (rs, $1, $2) {
      const name = decodeURIComponent($1)
      const val = decodeURIComponent($2)
      obj[name] = val
      return rs
    })
  }
  return obj
}

// 将路由扁平化
const flatten = (arr: any[]): any[] => {
  return arr.reduce(function (prev, cur) {
    return prev.concat(
      Array.isArray(cur.children) ? flatten(cur.children) : cur
    )
  }, [])
}

export { getDataType, getRoutePath, getQueryObject }
