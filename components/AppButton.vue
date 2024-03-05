<template>
  <button
    class="px-[18px] py-[8px] rounded-[12px] sm:px-[22px] sm:py-[12px] font-medium transition ease-in delay-100 transform active:scale-[0.93] hover:opacity-80 disabled:bg-brand-dark-gray disabled:cursor-not-allowed"
    :class="{
      'bg-brand-yellow text-brand-black': !isInverted,
      'bg-white text-brand-black border-brand-black border-[1px]': isInverted,
    }"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
defineProps<{
  isInverted?: boolean
}>()
</script>
