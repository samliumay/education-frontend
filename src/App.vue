<!-- eslint-disable vue-scoped-css/enforce-style-type -->
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="app flex flex-col">
      <CookiesPopup
        v-if="showCookiesPopup"
        @close="setCookies"
      />
      <AppHeader />
      <main class="flex-1 py-5 container mx-auto px-5 md:px-0">
        <!-- eslint-disable-next-line vue/no-undef-components -->
        <router-view />
      </main>
      <AppFooter />
    </div>
  </n-config-provider>
</template>
<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { onMounted, onUnmounted, ref } from 'vue'

import { useListsStore } from '@/store/lists'

import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import CookiesPopup from './components/CookiesPopup.vue'

const listsStore = useListsStore()

// set valid height in IOS
const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}

const showCookiesPopup = ref<boolean>(false)

const computeCookies = () => {
  showCookiesPopup.value = !JSON.parse(localStorage.getItem('cookies') ?? '{}')
    ?.value
}

const setCookies = (value: boolean) => {
  localStorage.setItem('cookies', JSON.stringify({ value }))
  showCookiesPopup.value = false
}

onMounted(async () => {
  window.addEventListener('resize', appHeight)
  appHeight()
  await listsStore.populateLists()

  setTimeout(computeCookies, 1000)
})

onUnmounted(() => {
  window.removeEventListener('resize', appHeight)
})

const themeOverrides = {
  common: {
    primaryColor: 'rgb(34, 197, 94)',
  },
}
</script>
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.app {
  height: 100vh;
  height: var(--app-height);
}

body {
  background-color: #f5f5ef;
}
</style>
