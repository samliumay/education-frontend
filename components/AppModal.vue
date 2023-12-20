<template>
  <Teleport v-if="isOpen" to="body">
    <div
      class="w-full h-[100vh] bg-gray-700 absolute top-0 left-0 overflow-hidden"
      @click="$emit('close')"
    />
    <div class="fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
      <slot />
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
defineProps<{
  isOpen: boolean;
}>()
defineEmits(["close"])
</script>
