<template>
  <div v-if="catalogLoading" class="mx-[28px] md:mx-[48px] py-20">
    <AppLoader />
  </div>

  <div v-else class="flex flex-col gap-2">
    <n-breadcrumb class="mt-6 mb-10 mx-[28px] md:mx-[48px]">
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/">Главная</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">
        {{ catalog?.name ?? 'Catalog' }}
      </n-breadcrumb-item>
    </n-breadcrumb>

    <div
      class="flex justify-between items-start mx-[28px] md:mx-[48px] flex-col xl:flex-row xl:items-center gap-5"
    >
      <div class="flex items-center gap-[18px]">
        <h1 class="text-[38px] md:text-[32px] sm:text-[48px] font-medium uppercase">
          {{ catalog?.name ?? 'Catalog' }}
        </h1>
        <ImageBlock
          :image="catalog?.icon"
          class="w-[60px] md:w-[80px] h-[60px]"
        />
      </div>

      <slot name="filters" :filters="filters" />
    </div>

    <div
      class="mt-[48px] mx-[48px] flex flex-col gap-2"
    >
      <PageConstructor
        v-if="!productsPending"
        :blocks="products?.items ?? []"
        :block-props="blockProps"
        block-classes="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      />
      <div
        v-else
        class="flex justify-center items-center w-full h-full py-10 col-span-full row-span-full"
      >
        <AppLoader />
      </div>
    </div>

    <div
      v-if="products?.items?.length > 0"
      class="px-[28px] md:px-[48px] flex justify-center w-full mb-14 mt-14"
    >
      <AppButton>Показать больше</AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { computed } from 'vue'

import AppLoader from '../../AppLoader.vue'
import ImageBlock from '../blocks/misc/ImageBlock.vue'
import PageConstructor from '../PageConstructor.vue'

const props = defineProps<{
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

// API
const api = computed(() => props.api)
const address = 'https://api.clavis.the-o.co/api/v2/wagtail'

// Docs https://the-o.youtrack.cloud/articles/CLAVIS-A-32/Katalogi
// Catalog header and icon
const { data: catalogsGroup, pending: catalogsGroupPending } =
  await useAsyncData(`${api.value.type}_catalog_group`, () =>
    $fetch(`${address}/catalog/?type=${api.value.type}`),
  )

const { data: catalog, pending: catalogPending } = await useAsyncData(
  `${api.value.type}_catalog`,
  () =>
    $fetch(
      `${address}/catalog/${catalogsGroup.value?.items[0]?.id ?? 1}/?type=${
        api.value.type
      }`,
    ),
  { watch: [catalogsGroup] },
)

const catalogLoading = computed(
  () => catalogPending.value && catalogsGroupPending.value,
)

// Products Cards
const { data: products, pending: productsPending } = await useAsyncData(
  `${api.value.type}_products`,
  () =>
    $fetch(
      `${address}/products/?fields=*&product_type=${api.value.type}${filterQuery.value}`,
    ),
  { watch: [filterQuery] },
)
</script>
