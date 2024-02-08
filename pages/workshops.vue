<template>
  <TemplateProduct v-bind="templateProps">
    <template #filters="{ title }">
      <div class="flex flex-col md:flex-row md:items-center mx-10 gap-5">
        <div class="flex items-center gap-[18px]">
          <h1
            class="text-[38px] md:text-[32px] sm:text-[48px] font-medium uppercase"
          >
            {{ title }}
          </h1>
        </div>

        <div
          class="flex justify-start md:justify-end flex-wrap w-full items-center gap-[12px]"
        >
          <AppSelect
            v-model:value="filters.age_group"
            :placeholder="$t('common.filters.age')"
            clearable
            :options="ageOptions"
            class="sm:max-w-[135px] sm:min-w-[100px]"
          />
        </div>
      </div>
    </template>
  </TemplateProduct>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

import AppSelect from '../components/AppSelect.vue'
import TemplateProduct from '../components/cms/templates/TemplateProduct.vue'
import { ageOptions } from '../mappers/options'

const filters = ref({
  age_group: null,
})

const templateProps = computed(() => ({
  filters: filters.value,
  api: { type: 'Workshop' },
  template: { name: 'Воркшопы' },
  head: {
    title: 'Clavis — Workshops',
    description: `That's a page that contains information about all workshops available at Clavis`,
  },
  blockProps: {
    type: 'workshop',
  },
}))
</script>
