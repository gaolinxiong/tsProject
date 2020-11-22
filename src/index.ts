import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@antv/g2'
import VueCompositionAPI from '@vue/composition-api'
// import axios from 'axios';
import main from '@/store/main'
import Router from 'vue-router'
import Vuex from 'vuex'
import routes from '@/router'
// import VueSocketIO from 'vue-socket.io'
Vue.use(Router)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueCompositionAPI)


// Vue.use(new VueSocketIO({
//     debug: true,
//     // 服务器端地址
//     connection: 'http://localhost:3000',
//     vuex: {
//     }
// }))

// Vue.prototype.$http= axios;

// this.$socket.emit('login',{
//     username: 'username',
//     password: 'password'
// });
//
// //接收服务端的信息
// this.sockets.subscribe('relogin', (data) => {
//     console.log('123', data)
// })

const router = new Router({ routes })

const store = new Vuex.Store({
    modules: {
        $_main: main
    }
})

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount(root)
