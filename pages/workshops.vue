<template>
  <div class="flex items-center justify-between mt-[96px] mx-[48px]">
    <div class="flex items-center gap-[16px]">
      <h1 class="text-[48px] font-medium">Воркшопы</h1>
      <img src="../assets/icons/products/workshop_stars.svg" alt="Stars" />
    </div>
  </div>

  <div class="mt-[48px] grid-cols-3 gap-[24px] mx-[48px]">
    <ProductCard
      v-for="workshop in workshops"
      :key="workshop.id"
      :name="workshop.name"
      :times="workshop.schedule_slots"
      type="workshop"
      :tags="getTagsFromProduct(workshop)"
    />
  </div>
</template>
<script setup lang="ts">
import { type Ref, ref } from "vue"

import ProductCard from "../components/products/ProductCard.vue"
import { getTagsFromProduct } from "../helpers/products"
import type { Product } from "../types"

const workshops: Ref<Product[]> = ref([])
</script>
