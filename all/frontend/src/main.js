// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import axios from 'axios'

const app = createApp(App);
app.use(Router);

// 전역변수 설정 : axois 등
app.config.globalProperties.$axios = axios;
app.config.productionTip = false
app.mount('#app');
