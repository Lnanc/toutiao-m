import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//路由规则
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import("@/views/search")
    },
    {
        path: '/article/:articleID',
        name: 'article',
        component: () => import("@/views/article"),
        props: true
    },
    {
        path: '/',
        name: 'layout',
        component: () => import("@/views/layout"),
        children: [
            {
                path: '',
                name: 'homo',
                component: () => import('@/views/home')
            }, {
                path: 'qa',
                mame: 'qa',
                component: () => import('@/views/qa')
            }, {
                path: 'video',
                name: 'video',
                component: () => import('@/views/video')
            }, {
                path: 'my',
                name: 'my',
                component: () => import('@/views/my')
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router