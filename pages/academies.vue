<template>
  <div class="flex items-center justify-between mt-[96px] mx-[48px]">
    <div class="flex items-center gap-[16px]">
      <h1 class="text-[48px] font-medium">Академии</h1>
      <img src="../assets/icons/products/academy_stars.svg" alt="Stars" />
    </div>
  </div>

  <AcademySeason :selected="selectedSeason" @update:selected="(el) => selectedSeason = el" />

  <div class="mt-[48px] grid-cols-3 gap-[24px] mx-[48px]">
    <ProductCard
      v-for="academy in academies"
      :key="academy.id"
      :name="academy.name"
      :times="academy.schedule_slots"
      type="academy"
      :tags="getTagsFromProduct(academy)"
    />
  </div>
</template>
<script setup lang="ts">
import { type Ref, ref } from "vue"

import AcademySeason from "../components/products/AcademySeason.vue"
import ProductCard from "../components/products/ProductCard.vue"
import { getTagsFromProduct } from "../helpers/products"
import type { Product } from "../types"

const academies: Ref<Product[]> = ref([])

const selectedSeason = ref('summer' as 'summer')
</script>
