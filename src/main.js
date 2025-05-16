import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
// 新增：导入图标组件
import * as ElIcons from '@element-plus/icons-vue'
const app = createApp(App);
app.use(router);
// 新增：全局注册图标
Object.keys(ElIcons).forEach(key => {
  app.component(key, ElIcons[key])
})
app.mount('#app');
