<template>
  <div
    class="m-10 flex flex-col items-center"
  >
    <h2
      class="text-3xl sm:text-4xl md:text-5xl uppercase font-medium mb-20 lg:mb-14"
    >
      {{ blockData.title ? blockData.title : $t('common.video') }}
    </h2>
    <iframe
      :src="blockData.video_url"
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
  blockData: { video_url: string }
}>()
</script>
