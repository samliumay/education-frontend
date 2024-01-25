<!-- eslint-disable vue/no-v-html -->
<template>
  <n-space vertical>
    <AppDivider class="mb-[32px]" />
    <div class="flex justify-between items-center mx-10">
      <p>{{ title }}</p>
      <button @click="isOpened = !isOpened">
        <img src="/icons/plus_red.svg" alt="Plus icon" />
      </button>
    </div>

    <n-collapse-transition :show="isOpened">
      <RichText :html="description" />
    </n-collapse-transition>
  </n-space>
</template>
<script setup lang="ts">
import { NCollapseTransition, NSpace } from 'naive-ui'
import { ref } from 'vue'

import AppDivider from '../../../AppDivider.vue'
import RichText from './RichText.vue'

defineProps<{
  title: string
  description: string
}>()

const isOpened = ref(false)
</script>
