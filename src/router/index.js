import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', name: 'Index', component: Index, children:
    [ //二级路由
      // 商品路由
      { path: '/', name: 'Goods', component: () => import('../views/Goods.vue') },
      { path: '/goods', name: 'Goods', component: () => import('../views/Goods.vue') },
      // 评论路由
      { path: '/evaluate', name: 'Evaluate', component: () => import('../views/Evaluate.vue') },
      // 商家路由
      { path: '/shops', name: 'Shpos', component: () => import('../views/Shops.vue') },
      ]
  },
]

const router = new VueRouter({
  routes
})

export default router
