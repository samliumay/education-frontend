<template>
  <div class="block-padding" data-cms="main-seo-text">
    <h2 class="text-3xl md:text-5xl uppercase mb-8 font-bold text-brand-red">
      {{ blockData.value.heading }}
    </h2>
    <p class="text-brand-gray text-base xl:text-lg">
      {{ blockData.value.paragraph }}
    </p>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'

defineProps<{
  blockData: PageBlock[]
}>()
</script>
<style scoped>
@media (min-width: 1024px) {
  p {
    column-count: 2;
    column-gap: 40px;
  }
}
</style>
