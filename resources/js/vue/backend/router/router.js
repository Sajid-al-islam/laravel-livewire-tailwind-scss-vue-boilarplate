import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../views/Layout'
import Dashboard from '../views/Dashboard'
import Login from '../views/auth/Login'

import settingLayout from '../views/settings/Layout'
import settingProfile from '../views/settings/Profile'
import settingPassword from '../views/settings/Password'

Vue.use(VueRouter);
window.Fire = new Vue();

const routes = [{
        path: '/',
        component: Layout,
        children: [{
                path: '',
                name: 'Dashboard',
                component: Dashboard,
            },
            {
                path: 'setting',
                component: settingLayout,
                children: [{
                        path: '',
                        name: 'settingProfile',
                        component: settingProfile,
                    },
                    {
                        path: 'password',
                        name: 'settingPassword',
                        component: settingPassword,
                    },
                    // {
                    //     path: 'details/:id',
                    //     name: 'chapterDetails',
                    //     component: chapterDetails,
                    // },
                ],
            },

        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

const management_router = new VueRouter({
    routes,
    mode: 'hash',
    linkExactActiveClass: 'active',
    // scrollBehavior: function(to, from, savedPosition) {
    //     return { x: 0, y: 0 }
    // }
});

management_router.beforeEach((to, from, next) => {
    let isAuthenticated = window.localStorage?.token?.length ? true : false;
    if (isAuthenticated) {
        window.axios.defaults.headers.common["Authorization"] = `Bearer ${window.localStorage?.token}`;
        next();
    } else {
        window.axios.defaults.headers.common["Authorization"] = null;
        window.location.href = '/login'
        return 0;
    }

    // next()
})

export default management_router
