<template>
  <div class="my-10 grid grid-cols-1 sm:grid-cols-3 gap-[24px] sm:h-[500px] relative">
    <div
      class="overflow-hidden absolute w-full h-full flex items-center justify-end z-0"
    >
      <ImageBlock
        :image="blockData.value.author.photo"
        class="absolute w-3/12 sm:mr-[48px]"
      />
      <ImageBlock
        :image="blockData.value.background_image"
        class="w-full h-full object-cover"
      />
    </div>

    <div
      class="sm:absolute h-full flex flex-col gap-12 items-center sm:items-start justify-center sm:w-7/12 sm:pl-[48px] z-10"
      :class="
        blockData.value.text_color
          ? `text-[${blockData.value.text_color}]`
          : 'text-brand-red'
      "
    >
      <blockquote
        class="flex flex-col items-center sm:items-start gap-10 relative top-12"
      >
        <p class="font-medium text-9xl leading-[0]">“</p>
        <p class="font-medium text-3xl text-center sm:text-left">
          {{ blockData.value.quote_text }}
        </p>
      </blockquote>

      <p class="font-medium text-xl mt-4 mb-2">
        {{ blockData.value.author.name }} • {{ blockData.value.author.position }}
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
