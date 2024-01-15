<template>
  <TemplateProduct v-bind="templateProps">
    <template #filters>
      <div class="overflow-x-scroll w-full pb-3 md:overflow-hidden xl:w-fit">
        <div class="flex items-center gap-[12px] w-[800px]">
          <AppSelect placeholder="Направление" disabled />
          <AppSelect
            v-model:value="filters.language"
            placeholder="Язык"
            clearable
            :options="languageOptions"
          />
          <AppSelect
            v-model:value="filters.age_group"
            placeholder="Возраст"
            clearable
            :options="ageOptions"
          />
          <AppSelect placeholder="Филиал" disabled />
        </div>
      </div>
    </template>
  </TemplateProduct>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

import AppSelect from '../components/AppSelect.vue'
import TemplateProduct from '../components/cms/templates/TemplateProduct.vue'
import { ageOptions, languageOptions } from '../mappers/options'

const filters = ref({
  language: null,
  age_group: null,
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
</script>
