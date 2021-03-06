import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { initLisaStore } from 'store/lisa'
import { initWalletStore } from 'store/wallet'
import globalComponent from './components/common/install.js'
import installElementPlus from './plugins/element-plus.js'
import vClickout from 'vue3-clickout'

import 'virtual:svg-icons-register'
import './styles/index.scss'

import Mock from '@/mock'
Mock.bootstrap()

const app = createApp(App)
app.use(globalComponent)
installElementPlus(app)
app.use(router)
app.use(createPinia())
app.use(vClickout)
initLisaStore()
initWalletStore()

router.isReady().then(() => app.mount('#app'))
