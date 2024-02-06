<template>
  <div
    class="mx-[30px] sm:mx-[140px] flex flex-col gap-10"
    data-cms="main-video"
  >
    <div class="flex flex-col sm:flex-row justify-between gap-2 items-stretch">
      <h2 class="text-5xl font-medium text-brand-red sm:w-5/12">
        {{ $t('common.school') }}
      </h2>
      <div class="w-[1px] bg-brand-gray invisible sm:visible" />
      <p class="sm:w-5/12 text-black self-center">
        {{ $t('blocks.main.video.mainParagraph') }}
      </p>
    </div>

    <div class="w-full h-[520px] rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/hEQThgfXT30?si=-94Sr6GHaCJJSMX5"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="object-cover w-full h-full"
      />
    </div>

    <div class="flex flex-col sm:flex-row gap-4 justify-between">
      <div
        v-for="option in options"
        :key="option"
        class="flex gap-2 items-start"
      >
        <img src="/icons/star.svg" alt="Star" class="w-[20px] h-[20px]" />
        <p>{{ option }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// import type { PageBlock } from '../../../../types/cms'

// defineProps<{
//   item: PageBlock
// }>()

const { t } = useI18n()

const options = [
  t('blocks.main.video.paragraph1'),
  t('blocks.main.video.paragraph2'),
  t('blocks.main.video.paragraph3'),
]
</script>
