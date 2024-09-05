<!-- eslint-disable vue-scoped-css/enforce-style-type -->
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div
      class="flex justify-center items-start overflow-x-hidden"
      :class="$route.path === '/prices' ? 'bg-brand-light-gray' : 'bg-white'"
    >
      <div
        class="min-h-[100vh] max-w-[1520px] w-full mx-auto flex flex-col md:overflow-x-visible relative"
        :class="$route.path === '/prices' ? 'bg-brand-light-gray' : 'bg-white'"
      >
        <AppHeader />
        <n-notification-provider>
          <NuxtLayout>
            <NuxtPage class="mt-24 lg:mt-36"/>
          </NuxtLayout>
        </n-notification-provider>
        <AppCookieModal />
        <AppFooter v-if="$route.path !== '/menu'" />
      </div>
    </div>
  </n-config-provider>
</template>
<script setup lang="ts">
import { NNotificationProvider } from 'naive-ui'

import AppCookieModal from './components/modals/AppCookieModal.vue'
import AppFooter from './components/page/AppFooter.vue'
import AppHeader from './components/page/AppHeader.vue'
import { useCartStore } from './store/cart'
import { useUserStore } from './store/user'

useHead({
  title: 'Clavis Schule für Kunst und Wissenschaft',
  meta: [
    { charset: 'UTF-8' },
    {
      name: 'robots',
      content:
        'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      name: 'description',
      content:
        'In Clavis Schule finden Sie kreative Workshops in Berlin ✓Bildende Kunst ✓Naturwissenschaften ✓Theater ✓Sprachen → Alle Infos!',
    },
    { property: 'og:locale', content: 'de_DE' },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:title',
      content: 'Clavis Schule für Kunst und Wissenschaft',
    },
    {
      property: 'og:description',
      content:
        'In Clavis Schule finden Sie kreative Workshops in Berlin ✓Bildende Kunst ✓Naturwissenschaften ✓Theater ✓Sprachen → Alle Infos!',
    },
    { property: 'og:url', content: 'https://clavis-schule.de/' },
    { property: 'og:site_name', content: 'Clavis Schule' },
    { property: 'article:modified_time', content: '2023-09-04T08:01:51+00:00' },
    {
      property: 'og:image',
      content:
        'https://clavis-schule.de/wp-content/uploads/2023/08/Tag_der_offenen_-Tur_mob.png',
    },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [
    { rel: 'profile', href: 'https://gmpg.org/xfn/11' },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: 'https://clavis-schule.de',
    },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: 'https://clavis-schule.de/' },
  ],
})

const themeOverrides = {
  common: {
    primaryColor: 'rgb(34, 197, 94)',
    placeholderColor: '#202020',
    fontSize: '16px',
  },
}

const route = useRoute()

// Init anonymous user
const cart = useCartStore()
cart.init()

if (process.client) {
  const userStorage = useUserStore()

  if (route?.params?.code) {
    userStorage.googleAuth(route.params.code)
  }
}
</script>
<style>
.n-base-selection-placeholder__inner {
  color: #202020;
}

body {
  font-family: Aeroport, sans-serif;
  background: white;
  font-size: 16px;
  color: #202020;
}

/* Global classes */
.block-padding-x {
  @apply px-4 md:px-10;
}

.block-padding-y {
  @apply py-4 md:py-14;
}

.block-padding {
  @apply block-padding-x block-padding-y;
}

.block-margin-x {
  @apply mx-4 md:mx-14;
}

.block-margin-y {
  @apply my-4 md:my-10;
}

.block-margin {
  @apply block-margin-x block-margin-y;
}
</style>
