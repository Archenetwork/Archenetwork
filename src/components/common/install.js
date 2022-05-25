/*
 * @Descripttion: global register
 * @Author: pujianguo
 * @Date: @Date: 2022-05-22 23:12:59
 */

export default {
  install (Vue) {
    const components = import.meta.globEager('./*.vue')
    Object.keys(components).forEach(fileName => {
      const component = components[fileName]
      const componentName = fileName.replace(/(.*\/)*([^.]+).*/ig, '$2')
      Vue.component(componentName, component.default || component)
    })
  },
}
