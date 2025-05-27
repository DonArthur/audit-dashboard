import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pengaturan-kuesioner',
    name: 'pengaturan-kuesioner',
    component: () => import('../views/PengaturanKuesioner.vue')
  },
  {
    path: '/isi-kuesioner',
    name: 'isi-kuesioner',
    component: () => import('../views/IsiKuesioner.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
