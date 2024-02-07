<!-- eslint-disable vue/no-v-html -->

<template>
  <div class="px-10 about-course" data-cms="products-details-about-course">
    <div
      v-for="(item, index) in items"
      :key="item?.heading"
      class="mb-10 lg:flex lg:items-center"
    >
      <!-- <ImageBlockByID
        :id="item.image.value"
        class="h-[200px] rounded-xl overflow-hidden lg:w-1/2"
        image-class="!object-contain"
        :class="{
          'order-2 lg:order-1': index % 2 === 0,
          'order-1 lg:order-2': index % 2 !== 0,
        }"
      /> -->
      <div
        class="lg:w-1/2"
        :class="{
          'order-1 lg:order-2': index % 2 === 0,
          'order-2 lg:order-1': index % 2 !== 0,
        }"
      >
        <h2
          class="text-3xl sm:text-4xl md:text-5xl uppercase font-medium mb-12 text-brand-red"
        >
          {{ item?.heading?.value }}
        </h2>
        <RichText :html="item?.paragraph?.value" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

import type { PageBlock } from '../../../../../types/cms'
import ImageBlockByID from '../../misc/ImageBlockByID.vue'
import RichText from '../../misc/RichText.vue'

const props = defineProps<{
  blockData: PageBlock
}>()

type InputType = {
  type: string
  value: number
  id: string
}

type OutputType = {
  image: InputType | null
  heading: InputType | null
  paragraph: InputType | null
}

const transformArray = (input: InputType[]): OutputType[] => {
  const output: OutputType[] = []
  // eslint-disable-next-line id-length
  for (let i = 0; i < input.length; i += 3) {
    const image = input[i].type === 'image' ? input[i] : null
    const heading =
      input[i + 1] && input[i + 1].type === 'heading' ? input[i + 1] : null
    const paragraph =
      input[i + 2] && input[i + 2].type === 'paragraph' ? input[i + 2] : null
    output.push({ image, heading, paragraph })
  }
  return output
}

const items = computed(() => transformArray(props?.blockData || []))
</script>
