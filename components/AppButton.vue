<template>
  <button
    class="px-[24px] py-[16px] rounded-[12px]"
    :class="{
      'bg-black text-white': !isInverted,
      'bg-white text-black border-black border-[1px]': isInverted,
    }"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
defineProps<{
  isInverted?: boolean;
}>()
</script>
