import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less'

// 加载 Vant ui组件库
import Vant from 'vant';


// 加载 Vant 全局样式
import 'vant/lib/index.css';

//导入全局样式
import './styles/index.scss'


//加载动态设置 REM 基准值
import 'amfe-flexible';

//注册Vant 组件库
Vue.use(Vant);
//使用less
Vue.use(less)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
