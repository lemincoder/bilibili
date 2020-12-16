import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from "../views/Register";
import Login from "../views/Login";
import UserInfo from "../views/UserInfo";
import Edit from "../views/Edit";
import Home from "../views/Home";
import Article from "../views/Article";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/userinfo',
    component: UserInfo,
    meta: {
      istoken: true
    }
  },
  {
    path: '/edit',
    component: Edit
  },
  {
    path: '/home',
    component: Home,
    meta: {
      keepalive:true
    }
  },
  {
    path: '/article/:id',
    component: Article
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if ((!localStorage.getItem('id') || !localStorage.getItem('token'))&&to.meta.istoken == true) {
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})
export default router
