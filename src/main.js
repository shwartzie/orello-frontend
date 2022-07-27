import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store/index'
import './assets/styles/main.scss'
import 'element-plus/dist/index.css'
const app = createApp(App)
import vTitle from 'vuejs-title'
app.use(vTitle)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')

