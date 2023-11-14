<template>
  <n-config-provider :theme-overrides="themeOverrides">
  <AppHeader />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppFooter />
  </n-config-provider>
</template>
<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'

const themeOverrides = {
  common: {
    primaryColor: 'rgb(34, 197, 94)',
  },
}
</script>
