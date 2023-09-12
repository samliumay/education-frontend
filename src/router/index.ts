import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('@/pages/AllCourses.vue') },
  { path: '/course/:id', component: () => import('@/pages/CoursePage.vue') },
  { path: '/login', component: () => import('@/pages/LoginForm.vue') },
  {
    path: '/register',
    component: () => import('@/pages/RegistrationForm.vue'),
  },
  { path: '/terms', component: () => import('@/pages/TermsAndConditions.vue') },
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
