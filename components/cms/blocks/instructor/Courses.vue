<template>
  <div class="m-10">
    <h2
      class="text-3xl sm:text-4xl md:text-[56px] uppercase font-medium mb-20 lg:mb-14"
    >
      {{ blockData.heading }}
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
      <ProductCard
        v-for="product in blockData.cards"
        :key="product.id"
        :block-data="product"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { type PageBlock } from '../../../../types/cms'
import ProductCard from '../products/ProductCard.vue'

defineProps<{
  blockData: PageBlock[]
}>()
</script>
