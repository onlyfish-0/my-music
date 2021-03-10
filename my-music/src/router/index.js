import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import RoutePlaylist from '../views/RoutePlaylist.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 根路径重定向到home路径
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      isShow: true
    }
  },
  {
    path: '/hot',
    name: 'Hot',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Hot.vue'),
    meta: {
      isShow: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      isShow: true
    }
  },
  {
    path: '/playlist',
    name: 'RoutePlaylist',
    component: RoutePlaylist
  }
]

const router = new VueRouter({
  routes
})

export default router
