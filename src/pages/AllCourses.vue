<template>
  <div>
    <n-h1>{{ $t('links.all') }}</n-h1>
    <!-- filters -->
    <div>
      <n-form class="flex gap-3">
        <n-form-item
          v-for="filter in filters"
          :key="filter.key"
          class="flex-1"
          :label="$t(`common.filters.${filter.key}`)"
          :path="filter.key"
        >
          <n-select
            v-model:value="userFilters[filter.key]"
            :options="filter.options"
            clearable
          />
        </n-form-item>
      </n-form>
    </div>

    <div
      v-if="listsStore.isDataLoading"
      class="flex justify-center"
    >
      <n-spin size="large" />
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      <AppProductCard
        v-for="card in activeProductList"
        :key="card.id"
        :course="card"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { NForm, NFormItem, NH1, NSelect, NSpin, SelectOption } from 'naive-ui'
import { computed, ref, watch } from 'vue'

import { HTTP } from '@/api'
import AppProductCard from '@/components/AppProductCard.vue'
import { ageGroups, languages } from '@/constants'
import { useListsStore } from '@/store/lists'
import { Product } from '@/types'

const listsStore = useListsStore()

const filters = computed<{ key: keyof Filters; options: SelectOption[] }[]>(
  () => [
    {
      key: 'age_group',
      options: ageGroups.map(group => ({ label: group, value: group })),
    },
    {
      key: 'category',
      options: listsStore.categories.map(category => ({
        label: category.name,
        value: category.id,
      })),
    },
    {
      key: 'language',
      options: languages.map(lang => ({ label: lang, value: lang })),
    },
  ],
)

interface Filters {
  age_group?: string
  category?: number
  language?: string
}

const userFilters = ref<Filters>({})
const listedProducts = ref<Product[]>([])
const activeProductList = computed<Product[]>(() =>
  !listedProducts.value.length ? listsStore.products : listedProducts.value,
)

watch(
  userFilters,
  async () => {
    listedProducts.value = await HTTP.get('/api/v1/products/', {
      params: userFilters.value,
    })
  },
  { deep: true },
)
</script>
