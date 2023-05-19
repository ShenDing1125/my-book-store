import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import ImgUtil from './utils/imgUtil'

ImgUtil.storageImgList()

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')