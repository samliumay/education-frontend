<template>
  <div>
    <h1 class="hidden">{{ $t('links.all') }}</h1>
    <AppProductCard
      v-for="card in cards"
      :key="card.id"
      :course="card"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import AppProductCard from '@/components/AppProductCard.vue'
import { Product } from '@/types'

const cards = ref<Product[]>([])
</script>
