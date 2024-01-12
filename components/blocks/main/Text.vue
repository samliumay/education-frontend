<template>
  <p class="text-red-400 font-medium text-[28px] text-center">
    {{ item.text }}
  </p>
</template>
<script setup lang="ts">
import { PageBlock } from '../../../types'

defineProps<{
  item: PageBlock
}>()
</script>
