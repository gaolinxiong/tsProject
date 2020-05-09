import managePage from '@/pages/components/managePage/index.vue';
import manageAccount from '@/pages/components/manageAccount/index.vue';
import showPage from '@/pages/components/showPage/index.vue';
import loginPage from '@/pages/components/loginPage/index.vue';
import showPicChartPage from '@/pages/components/showPicChartPage/index.vue';
import app from '@/pages/App';

const routes = [
    {
        path: '',
        redirect: '/login',
        component: app,
        children: [
            {
                name: 'login',
                path: '/login',
                component: loginPage,
            },
            {
                name: 'showPage',
                path: '/showPage',
                component: showPage,
            },
            {
                name: 'showPicChartPage',
                path: '/showPicChartPage',
                component: showPicChartPage,
            },
            {
                name: 'managePage',
                path: '/managePage',
                component: managePage,
            },
            {
                name: 'manageAccount',
                path: '/manageAccount',
                component: manageAccount,
            }
        ]
    }
];
export default routes
