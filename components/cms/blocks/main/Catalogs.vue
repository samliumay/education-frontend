<template>
  <div class="block-padding" data-cms="main-catalogs">
    <AppHeading>
      {{ blockData.value.heading }}
    </AppHeading>

    <div
      class="mb-[64px] rounded-[12px] bg-brand-light-gray grid grid-cols-1 lg:grid-cols-3 gap-[24px] p-[8px]"
    >
      <button
        v-for="(option, index) in blockData?.value?.catalog_list"
        :key="option.name"
        class="font-medium rounded-[12px] py-2 text-base xl:text-lg"
        :class="{ 'bg-brand-yellow': index === currentCatalogIndex }"
        @click="currentCatalogIndex = index"
      >
        {{ option.name }}
      </button>
    </div>

    <template
      v-if="blockData?.value?.catalog_list?.[currentCatalogIndex]?.cards"
    >
      <div
        v-for="(option, index) in blockData?.value?.catalog_list"
        v-show="index === currentCatalogIndex"
        :key="option.name"
        class="grid grid-cols-1 lg:grid-cols-3 gap-x-[24px] gap-y-[64px]"
      >
        <ProductCard
          v-for="item in option.cards"
          :key="item?.id"
          :block-data="item"
          :extra-props="{ type: 'academy' }"
        />
      </div>
      <div class="mt-[64px] text-center">
        <button
          class="px-[64px] py-[12px] font-medium text-base xl:text-lg bg-brand-yellow rounded-[12px]"
          @click="
            navigateTo(
              blockData?.value?.catalog_list?.[currentCatalogIndex]
                ?.catalog_link ?? '/',
              { external: true },
            )
          "
        >
          {{ $t('blocks.main.toCatalogue') }}
        </button>
      </div>
    </template>
    <AppNotFound v-else />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import AppHeading from '@/components/AppHeading.vue'

import type { PageBlock } from '../../../../types/cms'
import AppNotFound from '../../../AppNotFound.vue'
import ProductCard from '../products/ProductCard.vue'

defineProps<{
  blockData: PageBlock
}>()

// eslint-disable-next-line vue/no-setup-props-destructure
const currentCatalogIndex = ref(0)
</script>
