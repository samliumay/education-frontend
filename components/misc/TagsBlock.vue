<template>
  <div class="inline-flex gap-[8px]">
    <div
      v-for="tag in tags"
      :key="tag"
      class="bg-gray-100 rounded-[90px] font-medium text-center px-[12px] py-[4px] text-sm"
    >
      {{ tag }}
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  tags: Array<string>
}>()
</script>
