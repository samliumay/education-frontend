<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-[24px] sm:h-[500px] relative">
    <div
      class="overflow-hidden absolute w-full h-full flex items-center justify-end z-0"
    >
      <ImageBlock :image="item.quote_img" class="absolute w-3/12 sm:mr-[48px]" />
      <ImageBlock :image="item.title_img" class="w-full h-full object-cover" />
    </div>

    <div
      class="sm:absolute flex flex-col gap-10 items-center sm:items-start justify-center sm:w-7/12 sm:pl-[48px] z-10"
      :class="item.text_color ? `text-[${item.text_color}]` : 'text-brand-red'"
    >
      <blockquote class="flex flex-col items-center sm:items-start gap-10 relative top-12 mx-2">
        <p class="font-medium text-9xl leading-3">“</p>
        <p class="font-medium text-2xl text-center sm:text-left">
          {{ item.description }}
        </p>
      </blockquote>

      <p class="font-medium text-2xl mt-4 mb-2">
        {{
          item.person
            ? `${item.person.first_name} ${item.person.last_name}`
            : ''
        }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'
import ImageBlock from '../misc/ImageBlock.vue'

defineProps<{
  item: PageBlock
}>()
</script>
