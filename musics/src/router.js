import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const route= new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:"/",
      redirect:"/registry"
    },
    {
      path:"/music",//音乐列表
      component:()=>import('./views/music/index.vue')
    },
    {
      path:"/login",//登录
      component:()=>import('./views/login/index.vue')
    },
    {
      path:"/registry",//注册
      component:()=>import('./views/registry/index.vue')
    },
    {
      path:"*",//404
      component:()=>import('./views/404/index.vue')
    },
  ]
})

//全局路由守卫
let routes = ['/music']

route.beforeEach((to,from,next) => {
  if (routes.includes(to.path)) {
    let token = localStorage.getItem('token');
    if(token){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})

export default route
 
 

