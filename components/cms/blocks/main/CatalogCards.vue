<template>
  <div class="flex flex-col m-10" data-cms="main-catalog-cards">
    <h2
      class="text-4xl md:text-6xl mb-8 uppercase w-full sm:w-8/12 font-medium"
    >
      {{ blockData.value.heading }}
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="card in blockData.value.cards"
        :key="card.description"
        class="bg-brand-light-gray p-6 rounded-lg cursor-pointer transition ease-in delay-100 transform active:scale-[0.98]"
        :to="card?.link ?? '/'"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-5xl text-brand-red font-medium">
            {{ card.title }}
          </h3>
          <img class="mt-1" src="/icons/chevron_left.svg" alt="Arrow" />
        </div>

        <div class="border-t-[1px] border-brand-red mt-6 mb-4" />

        <p class="text-brand-gray mb-4">
          {{ card.description }}
        </p>

        <p class="text-brand-black text-2xl font-medium mb-3">
          {{ card.price_info }}
        </p>

        <ImageBlock
          :image="card.photo"
          class="w-full aspect-square rounded-lg overflow-hidden"
        />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'
import ImageBlock from '../misc/ImageBlock.vue'

defineProps<{
  blockData: PageBlock[]
}>()
</script>
