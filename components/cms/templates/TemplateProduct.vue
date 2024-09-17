<template>
  <LoaderBlock v-if="catalogsGroupPending" />
  <div v-else class="flex flex-col gap-2">
    <div class="flex justify-between items-center" >
      <div>
        <n-breadcrumb class="mt-4 block-padding">
          <n-breadcrumb-item сlass="text-brand-gray">
            <NuxtLink to="/">{{ $t('common.main') }}</NuxtLink>
          </n-breadcrumb-item>
          <n-breadcrumb-item сlass="text-brand-gray">
            {{ catalog?.name ?? $t('common.catalogue') }}
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
      <div class="justify-end mt-4 mr-4 block-padding">
        <AppButton @click="goBack">
          {{ $t('common.back') }}
        </AppButton>
      </div>
    </div>

    <slot name="filters" :title="catalog?.name ?? 'Catalog'" />

    <LoaderBlock v-if="productsPending || catalogsGroupPending" />
    <div v-else class="block-padding flex flex-col gap-2">
      <PageConstructor
        :blocks="blocks"
        :block-props="blockProps"
        block-classes="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      />
    </div>

    <div class="px-[28px] md:px-[48px] flex justify-center w-full mb-14 mt-14">
      <AppButton v-if="false" @click="addMoreItems">
        {{ $t('common.showMore') }}
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

import { useRouter } from 'vue-router'

const props = defineProps<{
  head: { title: string; description: string }
  api: { type: string }
  filters: { language?: string; age_group?: string; season?: string; search?: string;  }
  blockProps: Record<string, unknown>
}>()

const router = useRouter()  // Importing the router instance

// Function to handle going back
const goBack = () => {
  router.go(-1)  // Go back to the previous page
}

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

const { locale } = useI18n({ useScope: 'global' })

// Docs https://the-o.youtrack.cloud/articles/CLAVIS-A-32/Katalogi
// Catalog header and icon
const { data: catalogsGroup, pending: catalogsGroupPending } =
  await useAsyncData(
    'catalogs',
    () =>
      $fetch(`${address}/catalog/`, {
        params: {
          locale: locale.value,
          type: api.value.type,
        },
      }),
    { watch: [locale], deep: true },
  )

const catalog = computed(() => catalogsGroup.value?.items?.[0])

// Products Cards
const catalogType = computed(() => {
  if (api.value.type === 'Workshop') {
    return 'Workshop,Event'
  }

  return api.value.type
})
// eslint-disable-next-line vue/no-setup-props-destructure
const { data: products, pending: productsPending } = await useAsyncData(
  'products',
  () =>
    $fetch(`${address}/products/`, {
      params: {
        locale: locale.value,
        fields: '*',
        product_type: catalogType.value,
        ...props.filters,
      },
    }),
  { watch: [locale, props.filters], deep: true },
)

// Add more items
const defaultItemsCount = 3
const itemsOnPage = ref(defaultItemsCount)

const addMoreItems = () => {
  itemsOnPage.value += defaultItemsCount
}

const blocks = computed(() => products?.value?.items ?? [])

// const isShowAddMoreItemsButton = computed(
//   () =>
//     products?.value?.items?.length > itemsOnPage.value &&
//     !productsPending.value,
// )
</script>
