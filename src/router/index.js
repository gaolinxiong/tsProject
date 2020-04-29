import managePage from '@/pages/components/managePage/index.vue';
import showPage from '@/pages/components/showPage/index.vue';
import app from '@/pages/App';

const routes = [
    {
        path: '',
        redirect: '/managePage',
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
export default routes
