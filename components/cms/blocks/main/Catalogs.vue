<template>
  <div class="mx-[28px] md:mx-[48px]">
    <h2 class="text-[32px] sm:text-[48px] mb-[48px] font-medium">UNSERE ANGEBOTE</h2>

    <div
      class="mb-[64px] rounded-[12px] bg-brand-light-gray grid grid-cols-1 sm:grid-cols-3 gap-[24px] p-[8px]"
    >
      <button
        v-for="option in catalogueOptions"
        :key="option.value"
        class="font-medium rounded-[12px] py-2"
        :class="{ 'bg-brand-yellow': option.value === currentCatalogue }"
        @click="currentCatalogue = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <template v-if="items.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-[24px] gap-y-[64px]">
        <div>
          <ProductCard
            v-for="item in items"
            :key="item.id"
            :block-data="item"
            :extra-props="{ type: 'academy' }"
          />
        </div>
      </div>
      <div class="mt-[64px] text-center">
        <button
          class="px-[64px] py-[12px] font-medium bg-brand-yellow rounded-[12px]"
        >
          Перейти в каталог
        </button>
      </div>
    </template>
    <AppNotFound v-else />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import type { PageBlock } from '../../../../types/cms'
import AppNotFound from '../../../AppNotFound.vue'
import ProductCard from '../products/ProductCard.vue'

defineProps<{
  items: PageBlock[]
}>()

const catalogueOptions = [
  {
    value: 'course',
    label: 'Kurse',
  },
  {
    value: 'academy',
    label: 'Akademie',
  },
  {
    value: 'workshop',
    label: 'Workshops',
  },
]

const currentCatalogue = ref('course')
</script>
