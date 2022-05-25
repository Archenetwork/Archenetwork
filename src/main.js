import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { initLisaStore } from 'store/lisa'
import globalComponent from './components/common/install.js'
import installElementPlus from './plugins/element-plus.js'

import 'virtual:svg-icons-register'
import './styles/index.scss'

import Mock from '@/mock'
Mock.bootstrap()

const app = createApp(App)
app.use(globalComponent)
installElementPlus(app)
app.use(router)
app.use(createPinia())
initLisaStore()

router.isReady().then(() => app.mount('#app'))
