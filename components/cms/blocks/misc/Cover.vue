<template>
  <div class="rounded-[12px] overflow-hidden relative">
    <ImageBlock
      :image="imageTitle"
      class="w-full h-full absolute top-0 left-0"
    />
    <ImageBlock :image="imageBackground" class="relative w-full h-full" />
  </div>
</template>
<script setup lang="ts">
import { type CmsImage } from '../../../../types/cms'
import ImageBlock from './ImageBlock.vue'

defineProps<{
  imageTitle?: CmsImage
  imageBackground: CmsImage
}>()
</script>
