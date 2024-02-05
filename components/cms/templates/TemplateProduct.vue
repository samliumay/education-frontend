<template>
  <LoaderBlock v-if="catalogsGroupPending" />
  <div v-else class="flex flex-col gap-2">
    <n-breadcrumb class="mt-6 mb-10 mx-10">
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/">Главная</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">
        {{ catalog?.name ?? 'Catalog' }}
      </n-breadcrumb-item>
    </n-breadcrumb>

    <slot name="filters" :title="catalog?.name ?? 'Catalog'" />

    <LoaderBlock v-if="isLoadingBlocks" />
    <div v-else class="mt-[48px] mx-[48px] flex flex-col gap-2">
      <PageConstructor
        :blocks="blocks"
        :block-props="blockProps"
        block-classes="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      />
    </div>

    <div class="px-[28px] md:px-[48px] flex justify-center w-full mb-14 mt-14">
      <AppButton v-if="isShowAddMoreItemsButton" @click="addMoreItems">
        Показать больше
      </AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { computed, ref } from 'vue'

import { getApiAddress } from '../../../utils/getApiAddress'
import LoaderBlock from '../blocks/misc/LoaderBlock.vue'
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

// API
const api = computed(() => props.api)
const address = getApiAddress('/api/v2/wagtail')

// Docs https://the-o.youtrack.cloud/articles/CLAVIS-A-32/Katalogi
// Catalog header and icon
const { data: catalogsGroup, pending: catalogsGroupPending } = useFetch(
  `${address}/catalog/?type=${api.value.type}`,
)
const catalog = computed(() => catalogsGroup.value?.items?.[0])

// Products Cards
const productUrl = computed(
  () => `${address}/products/?fields=*&product_type=${api.value.type}`,
)
// eslint-disable-next-line vue/no-setup-props-destructure
const { data: products, pending: productsPending } = useFetch(
  productUrl.value,
  { watch: [props.filters], query: props.filters },
)

const events = ref([])
const loadingEvents = ref([])
if (api.value.type === 'Workshop') {
  const { data: eventsItems, pending } = useFetch(
    `${address}/products/?fields=*&product_type=Event`,
    { watch: [props.filters], query: props.filters },
  )

  events.value = eventsItems.value
  loadingEvents.value = pending.value
}

const isLoadingBlocks = computed(() => {
  if (api.value.type === 'Workshop') {
    return loadingEvents.value && productsPending.value
  }

  return productsPending.va
})

// Add more items
const defaultItemsCount = 3
const itemsOnPage = ref(defaultItemsCount)

const addMoreItems = () => {
  itemsOnPage.value += defaultItemsCount
}

const blocks = computed(() => {
  const items = products?.value?.items ?? []

  if (events?.value?.items) {
    items.push(...events.value.items)
  }

  return items.slice(0, itemsOnPage.value)
})

const isShowAddMoreItemsButton = computed(
  () =>
    products?.value?.items?.length > itemsOnPage.value &&
    !productsPending.value,
)
</script>
