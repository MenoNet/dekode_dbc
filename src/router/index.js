import { createRouter, createWebHistory } from 'vue-router'
import Profile from '../views/Profile.vue'

import Home from '../views/Home.vue'

const routes = [
  {
    path: '/dekode_dbc',
    name: 'Home',
    component: Home
  },
  {
    path: '/dekode_dbc/:id',
    name: 'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
