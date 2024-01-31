<template>
  <div class="my-16">
    <h2 class="text-[32px] sm:text-[48px] mb-[48px] font-medium text-brand-red">
      {{ blockData.value.heading }}
    </h2>
    <p class="text-brand-gray">{{ blockData.value.paragraph }}</p>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'

defineProps<{
  blockData: PageBlock[]
}>()
</script>
