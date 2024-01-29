<template>
  <TemplateProduct v-bind="templateProps">
    <template #filters>
      <div class="flex items-center gap-[12px] w-[200px]">
        <AppSelect
          v-model:value="filters.age_group"
          placeholder="Возраст"
          clearable
          :options="ageOptions"
        />
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
