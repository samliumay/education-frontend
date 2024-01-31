<template>
  <div class="mx-[28px] md:mx-[48px]">
    <h2 class="text-[32px] sm:text-[48px] mb-[48px] font-medium">{{blockData.value[0].title}}</h2>

    <div
      v-if="blockData.value[0].cards.length > 0"
      class="grid grid-cols-1 sm:grid-cols-3 gap-x-[24px] gap-y-[64px]"
    >
      <ProductCard
        v-for="item in blockData.value[0].cards"
        :key="item.id"
        :block-data="item"
        :extra-props="{ type: 'academy' }"
      />
    </div>
    <AppNotFound v-else />
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'
import AppNotFound from '../../../AppNotFound.vue'
import ProductCard from '../products/ProductCard.vue'

defineProps<{
  blockData: PageBlock
}>()
</script>
