<template>
  <LoaderBlock v-if="pending" />
  <PageConstructor
    v-else
    :blocks="main.items[0].body"
    class="flex flex-col mt-8 mb-20"
  />
</template>
<script setup lang="ts">
import { getApiAddress } from '@/utils/getApiAddress'

import LoaderBlock from '../blocks/misc/LoaderBlock.vue'
import PageConstructor from '../PageConstructor.vue'

const { locale } = useI18n({ useScope: 'global' })

// API
const { data: main, pending } = useAsyncData(
  'homepage',
  () =>
    $fetch(getApiAddress(`/api/v2/wagtail/homepage/`), {
      params: {
        locale: locale.value,
      },
    }).then(out => {
      window.scrollTo({ top: 0 })

      return out
    }),
  { watch: [locale] },
)
</script>
