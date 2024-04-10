<template>
  <ImageBlock
    v-if="!pending"
    :image="image"
    class="rounded-xl overflow-hidden"
    :image-class="imageClass"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue'

import { getApiAddress } from '../../../../utils/getApiAddress'
import ImageBlock from './ImageBlock.vue'

// Init component
const props = defineProps<{ id: number; imageClass?: string }>()

// Get data
const imageId = computed(() => props?.id)
const { data: image, pending } = await useAsyncData(
  `random${String(imageId.value)}${String(Math.random)}`,
  () => $fetch(getApiAddress(`/api/v2/wagtail/images/${imageId.value}/`)),
  { watch: [imageId] },
)
</script>
