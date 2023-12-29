<template>
  <div class="mx-[48px]">
    <img :src="image.meta.download_url" :alt="image.title" class="w-full" />
  </div>
</template>
<script setup lang="ts">
import { type CmsImage } from "../../../types"

defineProps<{ image: CmsImage }>()
</script>
