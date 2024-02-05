<template>
  <TemplateProduct v-bind="templateProps">
    <template #filters="{ title }">
      <div
        class="flex flex-col lg:flex-row lg:items-center mx-10 gap-5"
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
          <!-- <AppSelect
          placeholder="Направление"
          disabled
          class="max-w-[160px] min-w-[120px]"
        /> -->
          <AppSelect
            v-model:value="filters.language"
            placeholder="Язык"
            clearable
            :options="languageOptions"
            class="max-w-[160px] min-w-[120px]"
          />
          <AppSelect
            v-model:value="filters.age_group"
            placeholder="Возраст"
            clearable
            :options="ageOptions"
            class="max-w-[160px] min-w-[120px]"
          />
          <!-- <AppSelect
          placeholder="Филиал"
          disabled
          class="max-w-[160px] min-w-[120px]"
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
