// import 'element-plus/theme-chalk/src/base.scss'
// import 'element-plus/theme-chalk/src/notification.scss'
// import 'element-plus/theme-chalk/src/message.scss'
// import 'element-plus/theme-chalk/src/message-box.scss'
// import 'element-plus/theme-chalk/src/button.scss'
// import 'element-plus/theme-chalk/src/input.scss'
// import 'element-plus/theme-chalk/src/overlay.scss'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'

import {
  Delete,
  Search,
  Calendar,
  Refresh,
  CaretBottom,
  CaretTop,
  Plus,
  ZoomIn,
  ZoomOut,
} from '@element-plus/icons-vue'

const icons = [
  Delete,
  Search,
  Calendar,
  Refresh,
  CaretBottom,
  CaretTop,
  Plus,
  ZoomIn,
  ZoomOut,
]
export default (app) => {
  icons.forEach(component => {
    app.component(component.name, component)
  })

  // element default config
  app.config.globalProperties.$ELEMENT = {
    size: 'small', zIndex: 3000,
  }
}
