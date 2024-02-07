<template>
  <div
    class="px-3 sm:px-10 pt-6 pb-4 sm:pt-24 sm:pb-12 flex flex-col items-center"
  >
    <h2
      class="uppercase text-[36px] sm:text-[56px] font-semibold mb-4 sm:mb-12"
    >
      {{ $t('common.video') }}
    </h2>
    <iframe
      :src="url"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      class="max-w-[1000px] w-full aspect-video"
    />
  </div>
</template>
<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>
