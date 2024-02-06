<template>
  <ImageBlock
    v-if="!pending"
    :image="image"
    class="w-full h-[300px] rounded-xl overflow-hidden"
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
const { data: image, pending } = await useFetch(
  getApiAddress(`/api/v2/wagtail/images/${imageId.value}/`),
  {
    deep: true,
    headers: {
      Authorization: 'Token ab09aca4ef07f510bb919bf24040997d4372b9d5',
    },
  },
)
</script>
