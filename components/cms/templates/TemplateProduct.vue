<template>
  <LoaderBlock v-if="catalogsGroupPending" />
  <div v-else class="flex flex-col gap-2">
    <div class="flex justify-between items-center">
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

const props = defineProps<{
  head: { title: string; description: string }
  api: { type: string }
  filters: {
    language?: string;
    age_group?: string;
    season?: string;
    search?: string;
  }
  blockProps: Record<string, unknown>
}>()

const head = computed(() => props.head)
useHead({
  title: head.value?.title || 'Clavis',
  meta: [
    {
      name: 'description',
      content: head.value?.description || 'Clavis website page'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://clavis-schule.de/'
    }
  ]
})

// API
const api = computed(() => props.api)
const address = getApiAddress('/api/v2/wagtail')

const { locale } = useI18n({ useScope: 'global' })

// Docs https://the-o.youtrack.cloud/articles/CLAVIS-A-32/Katalogi
// Catalog header and icon
const {
  data: catalogsGroup,
  pending: catalogsGroupPending
} =
  await useAsyncData(
    'catalogs',
    () =>
      $fetch(`${address}/catalog/`, {
        params: {
          locale: locale.value,
          type: api.value.type
        }
      }),
    {
      watch: [locale],
      deep: true
    }
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
  async () => {
    // Make the API request
    let response = await $fetch(`${address}/products/`, {
      params: {
        locale: locale.value,
        fields: '*',
        product_type: catalogType.value,
      },
    });

    // Log the initial response to the console
    console.log('Initial Response:', response);

    // Prepare the filtered products structure
    let filteredProducts = {
      total_count: 0, // Initialize total count
      items: [], // Initialize items array
    };

    // Check if props.filters.search is defined and has a value
    if (props.filters.search) {
      const searchTerm = props.filters.search.toLowerCase(); // Convert search term to lowercase for case-insensitive comparison
      console.log('Search Term:', searchTerm); // Log the search term for debugging

      // Access the items array
      const productsArray = response.items || []; // Fallback to an empty array if items doesn't exist

      // Filter the products based on the search term
      filteredProducts.items = productsArray.filter(product => {
        // Ensure product.name is defined and perform the check
        const productName = product.name ? product.name.toLowerCase() : '';
        console.log(`Checking product: ${productName}`); // Log each product name being checked
        return productName.includes(searchTerm); // Check if product name includes the search term
      });
    } else {
      // If no search term, return all products
      filteredProducts.items = response.items || [];
    }

    // Update total_count based on the filtered items
    filteredProducts.total_count = filteredProducts.items.length;

    // Log the filtered response for debugging
    console.log('Filtered Products:', filteredProducts);

    return filteredProducts; // Return the formatted response
  },
  { watch: [locale, props.filters], deep: true },
);


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
