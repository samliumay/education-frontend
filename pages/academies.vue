<template>
  <TemplateProduct v-bind="templateProps">
    <template #filters="{ title }">
      <div class="flex flex-col lg:items-start mx-10 gap-5">
        <div class="flex items-center gap-[18px]">
          <h1
            class="text-[38px] md:text-[32px] sm:text-[48px] font-medium uppercase"
          >
            {{ title }}
          </h1>
        </div>
        <AcademySeason
          :selected="filters.season"
          class="hidden md:flex"
          @update:selected="updateSeason"
        />
        <div class="flex flex-col md:hidden mb-2">
          <h3 class="text-brand-black mb-2 text-2xl font-medium">
            {{ $t('common.actions.chooseSeason') }}
          </h3>
          <AppSelect
            v-model:value="filters.season"
            :placeholder="$t('common.filters.season')"
            :options="seasonsOptions"
            class="w-full"
          />
        </div>
        <div
          class="flex justify-start lg:justify-end flex-wrap w-full items-center gap-[12px]"
        >
          <!-- <AppSelect
          class="max-w-[135px] min-w-[120px]"
          placeholder="Направление"
          disabled
        /> -->
          <AppSelect
            v-model:value="filters.language"
            :placeholder="$t('common.filters.language')"
            clearable
            :options="languageOptions"
            class="max-w-[135px] min-w-[100px]"
          />
          <AppSelect
            v-model:value="filters.age_group"
            :placeholder="$t('common.filters.age')"
            clearable
            :options="ageOptions"
            class="max-w-[135px] min-w-[120px]"
          />
          <!-- <AppSelect
          placeholder="Филиал"
          disabled
          class="max-w-[135px] min-w-[120px]"
        />
        <AppSelect
          placeholder="Смена"
          disabled
          class="max-w-[135px] min-w-[120px]"
        /> -->
        </div>
      </div>
    </template>
  </TemplateProduct>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

import AppSelect from '../components/AppSelect.vue'
import TemplateProduct from '../components/cms/templates/TemplateProduct.vue'
import AcademySeason from '../components/products/AcademySeason.vue'
import { ageOptions, languageOptions, seasonsOptions } from '../mappers/options'

const getCurrentSeason = () => {
  const date = new Date()
  const month = date.getMonth()

  if (month < 2 || month === 11) return 'Winter'
  if (month < 5) return 'Spring'
  if (month < 8) return 'Summer'

  return 'Autumn'
}

const filters = ref({
  language: null,
  age_group: null,
  season: getCurrentSeason(),
})

const updateSeason = (season: string) => {
  filters.value.season = season
}

const templateProps = computed(() => ({
  filters: filters.value,
  api: { type: 'Academy' },
  template: { name: 'Академии' },
  head: {
    title: 'Clavis — Academies',
    description: `That's a page that contains information about all academies available at Clavis`,
  },
  blockProps: {
    type: 'academy',
  },
}))
</script>
