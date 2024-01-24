<template>
  <div class="my-16">
    <p class="text-red-400 font-medium text-[20px] sm:text-[28px] text-center">
      {{ item.text }}
    </p>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'

defineProps<{
  item: PageBlock
}>()
</script>
