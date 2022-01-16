import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Skills',
    component: () => import(/* webpackChunkName: "about" */ '../views/Skills.vue')
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import(/* webpackChunkName: "about" */ '../views/Skills.vue')
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import(/* webpackChunkName: "about" */ '../views/Details.vue')
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import(/* webpackChunkName: "about" */ '../views/Project.vue')
  },
  {
    path: '/links',
    name: 'Links',
    component: () => import(/* webpackChunkName: "about" */ '../views/Links.vue')
  },
  {
    path: '/invite/:id',
    name: 'Invite',
    component: () => import(/* webpackChunkName: "about" */ '../views/Invitation.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
