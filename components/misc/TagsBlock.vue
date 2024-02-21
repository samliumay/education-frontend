<template>
  <div class="inline-flex gap-[8px]">
    <div
      v-for="tag in tags"
      v-show="tag"
      :key="tag"
      class="rounded-[90px] font-medium text-center px-[12px] py-[4px]"
      :class="whiteBg ? 'bg-white' : 'bg-gray-100'"
    >
      {{ tag }}
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  tags: Array<string>
  whiteBg?: boolean
}>()
</script>
