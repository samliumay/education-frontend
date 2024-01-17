<template>
  <n-breadcrumb class="mt-6 mb-10 mx-[28px] md:mx-[48px]">
    <n-breadcrumb-item сlass="text-brand-gray">
      <NuxtLink to="/">Главная</NuxtLink>
    </n-breadcrumb-item>
    <n-breadcrumb-item сlass="text-brand-gray">
      {{ template.name }}
    </n-breadcrumb-item>
  </n-breadcrumb>

  <div
    class="flex justify-between items-start mx-[28px] md:mx-[48px] flex-col xl:flex-row xl:items-center gap-5"
  >
    <div class="flex items-center gap-[18px]">
      <h1 class="text-[38px] md:text-[48px] font-medium uppercase">
        {{ template.name }}
      </h1>
      <img
        src="/icons/products/course_cloud.svg"
        class="w-[60px] md:w-[80px]"
        alt="cloud"
      />
    </div>

    <slot name="filters" :filters="filters" />
  </div>

  <div
    class="mt-[48px] gap-[24px] mx-[48px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
  >
    <PageConstructor
      v-if="!pending"
      :blocks="products?.items ?? []"
      :block-props="blockProps"
    />
    <AppLoader v-else />
  </div>

  <div class="mx-[28px] md:mx-[48px] flex justify-center w-full mb-14 mt-14">
    <AppButton>Показать больше</AppButton>
  </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { computed } from 'vue'

import AppLoader from '../../AppLoader.vue'
import PageConstructor from '../PageConstructor.vue'

const props = defineProps<{
  template: { name: string }
  head: { title: string; description: string }
  api: { type: string }
  filters: { language?: string; age_group?: string; season?: string }
  blockProps: Record<string, unknown>
}>()

const head = computed(() => props.head)
useHead({
  title: head.value?.title || 'Clavis',
  meta: [
    {
      name: 'description',
      content: head.value?.description || 'Clavis website page',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://clavis-schule.de/',
    },
  ],
})

const filterQuery = computed(() => {
  if (!props.filters) return ''

  const validEntries = Object.entries(props.filters).filter(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => typeof value === 'string' && value.trim() !== '',
  )

  if (!validEntries.length) return ''

  const queryString = validEntries
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&')

  return `&${queryString}`
})

const api = computed(() => props.api)
const { data: products, pending } = await useAsyncData(
  `${api.value.type}`,
  () =>
    $fetch(
      `https://api.clavis.the-o.co/api/v2/wagtail/products/?fields=*&product_type=${api.value.type}${filterQuery.value}`,
    ),
  { watch: [filterQuery] },
)
</script>
