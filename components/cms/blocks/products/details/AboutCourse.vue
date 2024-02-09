<!-- eslint-disable vue/no-v-html -->

<template>
  <div class="px-10 about-course" data-cms="products-details-about-course">
    <h2
      class="text-3xl sm:text-4xl md:text-5xl uppercase font-medium mb-12 relative"
    >
      {{ props?.blockData?.[0]?.value }}
    </h2>

    <div
      v-for="(item, index) in props?.blockData?.[1]?.value"
      :key="item?.title"
      class="mb-10 lg:flex lg:items-center"
    >
      <ImageBlockByID
        :id="item?.image"
        class="h-[200px] rounded-xl overflow-hidden lg:w-1/2"
        image-class="!object-contain"
        :class="{
          'order-2 lg:order-1': index % 2 === 0,
          'order-1 lg:order-2': index % 2 !== 0,
        }"
      />
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
          {{ item?.title }}
        </h2>
        <RichText :html="item?.paragraph" />
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

console.debug(props)
</script>
