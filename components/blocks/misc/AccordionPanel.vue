<template>
  <div>
    <AppDivider class="mb-[32px]" />
    <div class="flex justify-between items-center mx-[48px]">
      <p>{{ title }}</p>
      <img
        src="../../../assets/icons/plus_red.svg"
        alt="PLus icon"
        @click="isOpened = !isOpened"
      />
    </div>
    <p v-if="isOpened" class="text-gray-400 mt-[24px]">
      {{ description }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"

import AppDivider from "../../AppDivider.vue"

defineProps<{
  title: string;
  description: string;
}>()

const isOpened = ref(false)
</script>
