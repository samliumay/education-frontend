<template>
  <div class="flex items-center gap-[16px]">
    <h1 class="text-[32px] sm:text-[48px] font-medium">{{ title }}</h1>
    <img v-if="image_url" :src="image_url" :alt="alt_text" />
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
  image_url?: string
  alt_text?: string
}>()
</script>
