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
      :alt="image.title"
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

import { type CmsImage } from '../../../types/cms'
import { getApiAddress } from '../../../utils/getApiAddress'

const props = defineProps<{ image: CmsImage }>()

// Flags
const imageLoading = ref(true)
const imageBroken = ref(false)

const imageUrl = computed(() => {
  const downloadUrl = props.image?.meta?.download_url

  if (!downloadUrl) {
    imageBroken.value = true
    return ''
  }

  return getApiAddress(downloadUrl)
})
</script>
