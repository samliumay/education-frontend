<template>
  <div v-if="isOpen" class="flex gap-4 justify-between fixed bottom-0 left-0 w-full p-6 bg-brand-light-gray z-40">
    <div class="flex flex-wrap text-lg font-medium">
      <p>By using our site you are consenting to the use of cookies. For more information please refer to our&nbsp;</p>
      <NuxtLink class="text-brand-red" to="/legal/privacy">Data Protection Policy</NuxtLink>
    </div>

    <button class="border-[1px] border-black p-2 rounded-full w-fit h-fit" @click="close">
      <img alt="close" src="/icons/cross.svg">
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

// State
const isOpen = ref(window.localStorage.getItem('is-closed-cookie') !== 'true')

// Actions
const close = () => {
  isOpen.value = false
  window.localStorage.setItem('is-closed-cookie', 'true')
}
</script>
