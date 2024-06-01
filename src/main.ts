import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/src/message.scss'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
