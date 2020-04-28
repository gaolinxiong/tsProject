import Vue from 'vue'
import App from './pages/App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@antv/g2';
// import axios from 'axios';
import main from "@/store/main";
import Router from 'vue-router';
import Vuex from 'vuex';
import managePage from '@/pages/components/managePage/index.vue';
import showPage from '@/pages/components/showPage/index.vue';
import app from '@/pages/App';


Vue.use(Router);
Vue.use(Vuex);
Vue.use(ElementUI);
// Vue.prototype.$http= axios;


const routes = [
    {
        path: '',
        redirect: '/showPage',
        component: app,
        children: [
            {
                name: 'showPage',
                path: '/showPage',
                component: showPage,
            },
            {
                name: 'managePage',
                path: '/managePage',
                component: managePage,
            }
        ]
    }
];

const router = new Router({routes});

const store = new Vuex.Store({
    modules: {
        $_main: main,
    },
});

let root = document.createElement('div');
document.body.appendChild(root);


new Vue({
    router,
    store,
    render: (h)=> h(App)
}).$mount(root);
