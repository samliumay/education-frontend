import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('@/pages/AllCourses.vue') },
  { path: '/course/:id', component: () => import('@/pages/CoursePage.vue') },
  {
    path: '/buy/:id',
    component: () => import('@/pages/BuyForm.vue'),
  },
  { path: '/login', component: () => import('@/pages/LoginForm.vue') },
  { path: '/kontaktieren-sie-uns', component: () => import('@/pages/static/ContactUs.vue') },
  { path: '/agb', component: () => import('@/pages/static/AGB.vue') },
  { path: '/datenschutz', component: () => import('@/pages/static/Datenschutz.vue') },
  { path: '/impressum', component: () => import('@/pages/static/Impressum.vue') },
  {
    path: '/:url(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFound.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
