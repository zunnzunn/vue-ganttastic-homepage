import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/example',
    name: 'Example',
    component: () => import(/* webpackChunkName: "about" */ '../views/Example.vue')
  },
  {
    path: '/docs',
    name: 'Docs',
    component: () => import(/* webpackChunkName: "about" */ '../views/Docs.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
