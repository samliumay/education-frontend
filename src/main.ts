import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import { de } from '@/assets/translations/de'
import { en } from '@/assets/translations/en'
import { router } from '@/router/index'

import App from './App.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'de-DE',
  messages: {
    'en-US': en,
    'de-DE': de,
  },
})

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(pinia)
app.mount('#app')
