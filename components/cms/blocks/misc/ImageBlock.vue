<template>
  <div>
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
      :src="imageUrl"
      :alt="image?.title ?? 'image'"
      class="h-full w-full"
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
import { computed, ref } from 'vue'

import { type CmsImage } from '../../../../types/cms'
import { getApiAddress } from '../../../../utils/getApiAddress'

const props = defineProps<{ image: CmsImage }>()

console.debug('props', props)

// Flags
const imageLoading = ref(true)
const imageBroken = ref(false)

const imageUrl = computed(() => {
  const downloadUrl = props.image?.meta?.download_url
  console.debug('downloadUrl', downloadUrl)

  if (!downloadUrl) {
    imageBroken.value = true
    return ''
  }

  const curImg = getApiAddress(downloadUrl)
  console.debug('curImg', curImg)

  return getApiAddress(downloadUrl)
})
</script>
