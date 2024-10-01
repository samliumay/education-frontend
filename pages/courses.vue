<template>
  <TemplateProduct v-bind="templateProps">
    <template #filters="{ title }">
      <div class="flex flex-col lg:flex-row lg:items-center block-padding-x gap-5">
        <div class="flex items-center gap-[18px]">
          <h1 class="text-[38px] md:text-[32px] sm:text-[48px] font-medium uppercase">
            {{ title }}
          </h1>
        </div>

        <div class="flex justify-start lg:justify-end flex-wrap w-full items-center gap-[12px]">
          <AppInput
            v-show="!categoriesPending"
            v-model="filters.search"
            :isInvalid="true"
            :placeholder="$t('common.filters.search')"
            class="max-w-[160px] min-w-[120px]"
            type="search"
            pattern=".{1,64}"
            clearable
            @blur=""
          />

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
          <p>{{ $t('common.filters.age') }}</p>
          <AppInput
            v-show="!categoriesPending"
            v-model="ageFilters.min_age"
            :isInvalid="true"
            :placeholder="$t('common.filters.minAge')"
            class="max-w-[160px] min-w-[120px]"
            type="number"
            required
            @blur="getAge()"
          />
          <p>~</p>
          <AppInput
            v-show="!categoriesPending"
            v-model="ageFilters.max_age"
            :isInvalid="true"
            :placeholder="$t('common.filters.maxAge')"
            class="max-w-[160px] min-w-[120px]"
            type="number"
            required
            @blur="getAge()"
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

    <!-- Render filtered items -->
    <div v-for="item in filteredItems" :key="item.id">
      <h2>{{ item.name }}</h2>
      <p>Age Group: {{ item.age_group }}</p>
      <!-- Add more item details here -->
    </div>
  </TemplateProduct>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { getApiAddress } from '@/utils/getApiAddress';
import AppSelect from '../components/AppSelect.vue';
import AppInput from '../components/AppInput.vue';
import TemplateProduct from '../components/cms/templates/TemplateProduct.vue';
import { ageOptionsByLocale, languageOptionsByLocale } from '../mappers/options';

const { locale, t } = useI18n({ useScope: 'global' });
const languageOptions = languageOptionsByLocale(t);

const filters = ref({
  search: undefined,
  language: undefined,
  age_group: undefined as undefined | string,
  branch: undefined,
  category: undefined,
});

const ageFilters = ref({
  min_age: 1,
  max_age: 100,
});

// Utility function to extract age ranges
const extractAgeRange = (ageGroup: string) => {
  const rangeMatch = ageGroup.match(/(\d+)(?:-(\d+))?|(\d+)\+/);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1]) || parseInt(rangeMatch[3]);
    const max = rangeMatch[2] ? parseInt(rangeMatch[2]) : Infinity; // Use Infinity if it's a single value
    return { min, max };
  }
  return { min: 0, max: Infinity }; // Default case if no match
};

// Fetch data from API
const { data: itemsData, pending: itemsPending } = await useAsyncData('items', () =>
  $fetch(getApiAddress(`/api/v2/wagtail/products/`), {
    params: {
      locale: locale.value,
      fields: '*',
    },
  })
);

// Store fetched items
const items = ref(itemsData.value || []);

// Computed property for filtered items
const filteredItems = computed(() => {
  return items.value.filter(item => {
    const { min, max } = extractAgeRange(item.age_group);
    return min >= ageFilters.value.min_age && (max <= ageFilters.value.max_age || max === 100);
  });
});

// Watchers for age filters
watch(() => ageFilters.value.min_age, () => {
  if (ageFilters.value.min_age > ageFilters.value.max_age) {
    ageFilters.value.min_age = ageFilters.value.max_age; // Ensure min does not exceed max
  }
});

watch(() => ageFilters.value.max_age, () => {
  if (ageFilters.value.max_age < ageFilters.value.min_age) {
    ageFilters.value.max_age = ageFilters.value.min_age; // Ensure max does not fall below min
  }
});

// API for fetching branches
const { data: branches, branchesPending } = useFetch(getApiAddress(`/api/v2/products/branches/`));
const branchesOptions = computed(() =>
  branches.value
    ? branches.value.map(branch => ({
      label: branch.name,
      value: branch.id,
    }))
    : []
);

// API for fetching categories
const { data: categories, pending: categoriesPending } = await useAsyncData(
  'categories',
  () =>
    $fetch(getApiAddress(`/api/v2/products/categories/`), {
      params: {
        locale: locale.value,
      },
    }),
  { watch: [locale] }
);

const categoriesOptions = computed(() =>
  categories.value
    ? categories.value.map(category => ({
      label: category.name,
      value: category.name.replace(' ', '+'),
    }))
    : []
);
</script>
