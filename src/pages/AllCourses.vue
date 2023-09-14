<template>
  <div>
    <n-h1>{{ $t('links.all') }}</n-h1>

    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      <AppProductCard
        v-for="card in listsStore.products"
        :key="card.id"
        :course="card"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { NH1 } from 'naive-ui'

import AppProductCard from '@/components/AppProductCard.vue'
import { useListsStore } from '@/store/lists'

const listsStore = useListsStore()
</script>
