<!-- eslint-disable vue-scoped-css/enforce-style-type -->
<!-- eslint-disable vue/block-lang -->
<!-- eslint-disable vue/block-lang -->
<template>
  <n-config-provider :theme-overrides="themeOverrides" class="text-gray-">
    <div class="min-h-[100vh] flex flex-col overflow-x-hidden">
      <AppHeader />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <div class="grow" />
      <AppFooter />
    </div>
  </n-config-provider>
</template>
<script setup lang="ts">
import AppFooter from "./components/AppFooter.vue"
import AppHeader from "./components/AppHeader.vue"

const themeOverrides = {
  common: {
    primaryColor: "rgb(34, 197, 94)",
  },
}
</script>
<style>
body {
  background: #f4f1f1;
}
</style>
