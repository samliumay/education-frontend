<template>
  <div class="rounded-[12px] overflow-hidden relative">
    <ImageBlock
      v-if="category === 'course' || category === 'academy'"
      :image="imageTitle"
      :class="`absolute ${imageStyles}`"
    />
    <ImageBlock :image="imageBackground" class="w-full h-full object-cover" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

import { type CmsImage } from '../../../../types/cms'
import ImageBlock from './ImageBlock.vue'

const props = defineProps<{
  imageTitle?: CmsImage
  imageBackground: CmsImage
  category?: string
  ageGroup?: string
}>()

const imageStyles = computed(() => {
  if (props.category === 'academy') {
    if (props.ageGroup === '12+' || props.ageGroup === '14+') {
      return 'h-[110%] -bottom-[10%] right-[8%]'
    }
  }

  if (props.category === 'course') {
    return 'h-full -bottom-0 -left-[20%]'
  }

  return 'h-[90%] -bottom-[10%] right-[5%]'
})
</script>
