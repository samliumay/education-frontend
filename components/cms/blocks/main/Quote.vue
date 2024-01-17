<template>
  <div class="grid grid-cols-3 gap-[24px] h-[500px] relative">
    <div
      class="overflow-hidden absolute w-full h-full flex items-center justify-end"
    >
      <ImageBlock :image="item.quote_img" class="absolute w-3/12 mr-[28px] md:mr-[48px]" />
      <ImageBlock :image="item.title_img" class="w-full h-full object-cover" />
    </div>

    <div
      class="absolute h-full flex flex-col gap-10 items-start justify-center w-7/12 pl-[28px] md:pl-[48px]"
      :class="item.text_color ? `text-[${item.text_color}]` : 'text-brand-red'"
    >
      <blockquote class="flex flex-col gap-10">
        <p class="font-medium text-9xl leading-3">“</p>
        <p class="font-medium text-2xl">
          {{ item.description }}
        </p>
      </blockquote>

      <p class="font-medium text-2xl">
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

const props = defineProps<{
  item: PageBlock
}>()

console.debug(props)
</script>
