import './assets/main.css' // هذا السطر هو المسؤول عن تشغيل التنسيقات
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
