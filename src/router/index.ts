import { nextTick } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/AllCourses.vue'),
    name: 'Clavis Schule für Kunst und Wissenschaft',
  },
  {
    path: '/course/:id',
    component: () => import('@/pages/CoursePage.vue'),
  },
  {
    path: '/buy/:id',
    component: () => import('@/pages/BuyForm.vue'),
  },
  {
    path: '/login',
    component: () => import('@/pages/LoginForm.vue'),
    name: 'Mein Konto - Clavis Schule',
  },
  {
    path: '/instructors',
    component: () => import('@/pages/InstructorsPage.vue'),
    name: 'Fakultät & Mitarbeiter - Clavis Schule',
  },
  {
    path: '/kontaktieren-sie-uns',
    component: () => import('@/pages/static/ContactUs.vue'),
    name: 'Kontaktieren Sie uns - Clavis Schule',
  },
  {
    path: '/agb',
    component: () => import('@/pages/static/AGB.vue'),
    name: 'Allgemeine Geschäftsbedingungen - Clavis Schule',
  },
  {
    path: '/widerrufsbelehrung',
    component: () => import('@/pages/static/WiderrufsbelehrungPage.vue'),
  },
  {
    path: '/veranstaltungen-bei-clavis',
    component: () => import('@/pages/static/VeranstaltungenClavis.vue'),
  },
  {
    path: '/angebote-fuer-schulen',
    component: () => import('@/pages/static/AngeboteFurSchulen.vue'),
  },
  {
    path: '/datenschutz',
    component: () => import('@/pages/static/Datenschutz.vue'),
    name: 'Datenschutz - Clavis Schule',
  },
  {
    path: '/impressum',
    component: () => import('@/pages/static/Impressum.vue'),
    name: 'Impressum - Clavis Schule',
  },
  {
    path: '/:url(.*)*',
    component: () => import('@/pages/NotFound.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach(to => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  nextTick(() => {
    document.title =
      (to.name as string) || 'Clavis Schule für Kunst und Wissenschaft'
  })
})
