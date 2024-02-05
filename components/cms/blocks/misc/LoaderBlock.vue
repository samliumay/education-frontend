<template>
  <div class="flex flex-col justify-center items-center gap-0 w-full h-full py-20 col-span-full row-span-full" data-cms="misc-loader-block">
    <img src="/icons/logo.svg" alt="CLAVIS" class="w-[200px] h-[200px]" />
    <AppLoader class="transform scale-125" />
  </div>
</template>
<script setup lang="ts">
import AppLoader from '../../../AppLoader.vue'
</script>
