<template>
  <div>
    <h1 class="hidden">{{ $t('links.all') }}</h1>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 grid-flow-col gap-4"
    >
      <AppProductCard
        v-for="card in products"
        :key="card.id"
        :course="card"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import AppProductCard from '@/components/AppProductCard.vue'
import { useListsStore } from '@/store/lists'

const listsStore = useListsStore()
const { products } = listsStore
</script>
