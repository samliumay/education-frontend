<template>
  <div class="px-3 sm:px-10 pt-6 pb-4 sm:pt-24 sm:pb-12">
    <h2
      class="uppercase text-[36px] sm:text-[56px] font-semibold mb-4 sm:mb-12"
    >
      {{ $t('blocks.tutorCourses') }}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :block-data="product"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { PageBlock } from '../../../../types/cms'
import ProductCard from '../products/ProductCard.vue'

defineProps<{
  products: PageBlock[]
}>()
</script>
