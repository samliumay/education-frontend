<!-- eslint-disable vue/no-v-html -->

<template>
  <div class="px-10">
    <h2 class="text-5xl uppercase font-medium mb-12">{{ title }}</h2>
    <RichText :html="paragraph" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

import type { PageBlock } from '../../../../../types/cms'
import RichText from '../../misc/RichText.vue'

const props = defineProps<{
  item: PageBlock
}>()

const title = computed(
  () => props?.item?.find(item => item?.type === 'heading')?.value,
)
const paragraph = computed(
  () => props?.item?.find(item => item?.type === 'paragraph')?.value,
)
</script>
