<template>
  <button
    class="px-[18px] py-[8px] rounded-[12px] sm:px-[22px] sm:py-[12px] font-medium"
    :class="{
      'bg-brand-yellow text-black': !isInverted,
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
