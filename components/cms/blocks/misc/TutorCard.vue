<template>
  <div
    class="bg-white pb-[40px] p-[16px] rounded-xl cursor-pointer text-center"
  >
    <img
      :src="tutor.title_img.meta.download_url"
      :alt="tutor.title_img.title"
      class="w-full rounded-xl"
    />
    <p class="mt-[24px] text-[20px] text-red-400">
      {{ `${tutor.first_name} ${tutor.last_name}` }}
    </p>
    <p class="font-medium mb-6">
      {{ tutor.category }}
    </p>

    <p class="text-red-400 underline" role="navigation">Подробнее →</p>
  </div>
</template>
<script setup lang="ts">
import { type CmsImage } from '../../../../types/cms'

defineProps<{
  tutor: {
    first_name: string
    last_name: string
    category: string
    title_img: CmsImage
  }
}>()
</script>
