<!-- eslint-disable vue/no-v-html -->

<template>
  <div
    v-if="blockData?.[1]?.value?.length"
    class="px-10 about-course"
    data-cms="products-details-about-course"
  >
    <h2
      class="text-3xl sm:text-4xl md:text-5xl uppercase font-medium mb-12 relative"
    >
      {{ blockData?.[0]?.value }}
    </h2>

    <div
      v-for="(item, index) in blockData?.[1]?.value"
      :key="item?.title"
      class="mb-10 lg:grid lg:grid-cols-2 lg:items-center"
    >
      <ImageBlock
        :image="item?.image"
        class="rounded-xl overflow-hidden"
        image-class="!object-contain max-h-[300px]"
        :class="{
          'order-2 lg:order-1': index % 2 === 0,
          'order-1 lg:order-2': index % 2 !== 0,
        }"
      />
      <div
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
        <RichText :html="item?.paragraph" without-block-padding />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../../types/cms'
import ImageBlock from '../../misc/ImageBlock.vue'
import RichText from '../../misc/RichText.vue'

defineProps<{
  blockData: PageBlock
}>()
</script>
