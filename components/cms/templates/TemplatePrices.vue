<template>
  <LoaderBlock v-if="pending" />
  <main v-else class="bg-brand-light-gray">
    <n-breadcrumb class="mt-6 mb-10 block-padding-x">
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/">{{ $t('common.main') }}</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink>{{ $t('common.prices') }}</NuxtLink>
      </n-breadcrumb-item>
    </n-breadcrumb>

    <h1
      class="block-padding-x text-brand-red text-5xl md:text-[72px] font-bold uppercase"
    >
      {{ prices.items[0].heading }}
    </h1>

    <PageConstructor
      :blocks="prices.items[0].body"
      class="flex flex-col mt-8 mb-20"
    />
  </main>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

import { getApiAddress } from '@/utils/getApiAddress'

import LoaderBlock from '../blocks/misc/LoaderBlock.vue'
import PageConstructor from '../PageConstructor.vue'

const { locale } = useI18n({ useScope: 'global' })

// API
const { data: prices, pending } = useAsyncData(
  'prices',
  () =>
    $fetch(getApiAddress(`/api/v2/wagtail/prices/`), {
      params: {},
    }),
  { watch: [locale] },
)
</script>
