<template>
  <div class="mx-[28px] md:mx-[48px]">
    <h2 class="text-[32px] sm:text-[48px] mb-[48px] font-medium">
      {{ blockData.value.heading }}
    </h2>

    <div
      class="mb-[64px] rounded-[12px] bg-brand-light-gray grid grid-cols-1 sm:grid-cols-3 gap-[24px] p-[8px]"
    >
      <button
        v-for="(option, index) in blockData?.value?.catalog_list"
        :key="option.name"
        class="font-medium rounded-[12px] py-2"
        :class="{ 'bg-brand-yellow': index === currentCatalogIndex }"
        @click="currentCatalogIndex = index"
      >
        {{ option.name }}
      </button>
    </div>

    <template v-if="blockData?.value?.catalog_list?.[currentCatalogIndex]?.cards">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-[24px] gap-y-[64px]">
        <ProductCard
          v-for="item in blockData.value.catalog_list[currentCatalogIndex].cards"
          :key="item.id"
          :block-data="item"
          :extra-props="{ type: 'academy' }"
        />
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
  blockData: PageBlock
}>()

// eslint-disable-next-line vue/no-setup-props-destructure
const currentCatalogIndex = ref(0)
</script>
