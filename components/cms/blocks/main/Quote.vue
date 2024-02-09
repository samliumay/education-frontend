<template>
  <div
    class="block-padding block-margin flex flex-col items-center justify-center lg:justify-start lg:flex-row gap-10 lg:h-[500px] relative rounded-md overflow-hidden"
    data-cms="main-quote"
  >
    <div
      class="overflow-hidden absolute top-0 left-0 w-full h-full flex items-center justify-end z-0"
    >
      <ImageBlock
        :image="blockData.value.background_image"
        class="w-full h-full object-cover"
      />
    </div>

    <ImageBlock
      :image="blockData.value.author.photo"
      class="relative w-3/12 lg:mr-[48px] lg:absolute lg:right-0"
    />

    <div
      class="lg:absolute h-full flex flex-col gap-12 items-center lg:items-start justify-center lg:w-7/12 lg:pl-[48px] z-10"
      :class="
        blockData.value.text_color
          ? `text-[${blockData.value.text_color}]`
          : 'text-brand-red'
      "
    >
      <blockquote
        class="flex flex-col items-center lg:items-start gap-8 relative top-12"
      >
        <img src="icons/quotes.svg" class="w-[64px] h-[64px]" alt="quotes" />
        <p class="font-medium text-3xl text-center lg:text-left">
          {{ blockData.value.quote_text }}
        </p>
      </blockquote>

      <p class="font-medium text-xl mt-8 mb-2">
        {{ blockData.value.author.name }} •
        {{ blockData.value.author.position }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'
import ImageBlock from '../misc/ImageBlock.vue'

defineProps<{
  blockData: PageBlock
}>()
</script>
