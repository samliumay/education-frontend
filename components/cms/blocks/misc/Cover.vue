<template>
  <div class="rounded-[12px] overflow-hidden relative">
    <ImageBlock
      :image="imageTitle"
      class="absolute bottom-0 right-6 w-5/12"
    />
    <ImageBlock
      :image="imageBackground"
      class="w-full h-full object-cover"
    />
  </div>
</template>
<script setup lang="ts">
import { type CmsImage } from '../../../../types/cms'
import ImageBlock from './ImageBlock.vue'

defineProps<{
  imageTitle: CmsImage
  imageBackground: CmsImage
}>()
</script>
