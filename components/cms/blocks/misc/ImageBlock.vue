<template>
  <div data-cms="misc-image-block">
    <!-- Fallback -->
    <div v-if="imageBroken" class="bg-brand-yellow h-full w-full" />

    <!-- Loading -->
    <div
      v-else-if="imageLoading"
      class="animate-pulse bg-brand-light-gray h-full w-full"
    />

    <!-- Image -->
    <img
      v-show="!imageBroken && !imageLoading"
      ref="shownImage"
      :src="imageUrl"
      :alt="image?.title ?? 'image'"
      :class="`w-full h-full object-cover ${imageClass ?? ''}`"
      @load="imageLoading = false"
      @error="
        () => {
          imageBroken = true
          imageLoading = false
        }
      "
    />
  </div>
</template>
<script setup lang="ts">
import { computed, type Ref, ref, watch } from 'vue'

import { type CmsImage } from '../../../../types/cms'
import { getApiAddress } from '../../../../utils/getApiAddress'

const props = defineProps<{ image: CmsImage; imageClass?: string }>()

// Flags
const imageLoading = ref(true)
const imageBroken = ref(false)

// eslint-disable-next-line vue/require-typed-ref
const shownImage: Ref<HTMLImageElement | null> = ref(null)

const imageUrl = computed(() => {
  const downloadUrl = props.image?.meta?.download_url

  if (!downloadUrl) {
    imageBroken.value = true
    return ''
  }

  return getApiAddress(downloadUrl)
})

watch(
  () => [props.image, shownImage.value],
  () => {
    if (shownImage.value && props.image?.meta) {
      const naturalWidth = shownImage.value?.naturalWidth || 1
      const naturalHeight = shownImage.value?.naturalHeight || 1
      const offsetX = props.image.meta.focal_point_width / 2
      const offsetY = props.image.meta.focal_point_height / 2
      const pointX = props.image.meta.focal_point_x
      const pointY = props.image.meta.focal_point_y
      const naturalWidthBorder = naturalWidth / 2
      const naturalHeightBorder = naturalHeight / 2
      shownImage.value.style.objectPosition = `${
        ((pointX > naturalWidthBorder ? pointX + offsetX : pointX - offsetX) /
          naturalWidth) *
        100
      }% ${
        ((pointY > naturalHeightBorder ? pointY + offsetY : pointY - offsetY) /
          naturalHeight) *
        100
      }%`
    }
  },
  { immediate: true },
)
</script>
