<template>
  <TemplateProduct v-bind="templateProps">
    <template #filters="{ title }">
      <div
        class="flex flex-col lg:flex-row lg:items-center block-padding-x gap-5"
      >
        <div class="flex items-center gap-[18px]">
          <h1
            class="text-[38px] md:text-[32px] sm:text-[48px] font-medium uppercase"
          >
            {{ title }}
          </h1>
        </div>

        <div
          class="flex justify-start lg:justify-end flex-wrap w-full items-center gap-[12px]"
        >
          <AppSelect
            v-show="!categoriesPending"
            v-model:value="filters.category"
            :placeholder="$t('common.filters.direction')"
            clearable
            class="max-w-[160px] min-w-[120px]"
            :options="categoriesOptions"
          />
          <AppSelect
            v-model:value="filters.language"
            :placeholder="$t('common.filters.language')"
            clearable
            :options="languageOptions"
            class="max-w-[160px] min-w-[120px]"
          />
          <AppSelect
            v-model:value="filters.age_group"
            :placeholder="$t('common.filters.age')"
            clearable
            :options="ageOptions"
            class="max-w-[160px] min-w-[120px]"
          />
          <AppSelect
            v-show="!branchesPending"
            v-model:value="filters.branch"
            :placeholder="$t('common.filters.branch')"
            clearable
            class="max-w-[160px] min-w-[120px]"
            :options="branchesOptions"
          />
        </div>
      </div>
    </template>
  </TemplateProduct>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

import { getApiAddress } from '@/utils/getApiAddress'

import AppSelect from '../components/AppSelect.vue'
import TemplateProduct from '../components/cms/templates/TemplateProduct.vue'
import { ageOptions, languageOptions } from '../mappers/options'

const { locale } = useI18n({ useScope: 'global' })

const filters = ref({
  language: null,
  age_group: null,
  branch: null,
  category: null,
})

const templateProps = computed(() => ({
  filters: filters.value,
  api: { type: 'Course' },
  template: { name: 'Курсы' },
  head: {
    title: 'Clavis — Courses',
    description: `That's a page that contains information about all courses available at Clavis`,
  },
  blockProps: {
    type: 'сourse',
  },
}))

// API
const { data: branches, branchesPending } = useFetch(
  getApiAddress(`/api/v2/products/branches/`),
)
const branchesOptions = computed(() =>
  branches.value
    ? branches.value.map(branch => ({
        label: branch.name,
        value: branch.id,
      }))
    : [],
)

const { data: categories, pending: categoriesPending } = await useAsyncData(
  'categories',
  () =>
    $fetch(getApiAddress(`/api/v2/products/categories/`), {
      params: {
        locale: locale.value,
      },
    }),
  { watch: [locale] },
)

const categoriesOptions = computed(() =>
  categories.value
    ? categories.value.map(category => ({
        label: category.name,
        value: category.id,
      }))
    : [],
)
</script>
