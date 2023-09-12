<!-- eslint-disable vue-scoped-css/enforce-style-type -->
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="app flex flex-col">
      <AppHeader />
      <main class="flex-1 p-5">
        <!-- eslint-disable-next-line vue/no-undef-components -->
        <router-view />
      </main>
      <AppFooter />
    </div>
  </n-config-provider>
</template>
<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { onMounted, onUnmounted } from 'vue'

import { useListsStore } from '@/store/lists'

import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'

const listsStore = useListsStore()

// set valid height in IOS
const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  console.error('Ho')
}

onMounted(async () => {
  window.addEventListener('resize', appHeight)
  appHeight()
  await listsStore.populateLists()
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
</style>
