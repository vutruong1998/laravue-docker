import { createWebHistory, createRouter } from 'vue-router'
import store from './store'
import User from './components/User.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

export const routes = [
    {
        path: '/',
        name: "Home",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: "Login",
        component: Login,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: "Register",
        component: Register,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/user',
        name: "User",
        component: User,
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/isAuthenticated']
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
          next({ name: 'Login' })
        } else {
          next()
        }
    } else {
        next()
    }
})

export default router