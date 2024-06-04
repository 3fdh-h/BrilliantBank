import { createApp } from 'vue'
import App from './App.vue'

//导入Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//导入router.js
import router from './router/router.js'

// 导入axios
import Axios from 'axios'
import './styles/element-variables.scss'



const app=createApp(App);
//注册全局组件，注册第三方框架

//注册Elment-plus
app.use(ElementPlus)

//注册路由组件
app.use(router)

//注册axios
app.use(Axios)

app.mount('#app')
