<template>
  <LoaderBlock v-if="pending" />
  <main v-else class="flex flex-col gap-2 mb-10">
    <div class="flex flex-col gap-10">
      <ErrorBoundaryBlock v-for="(block, index) in blocksList" :key="index">
        <component
          :is="block.name"
          v-if="!checkIsEmpty(block.blockData)"
          :block-data="block.blockData"
          :has-button="block?.hasButton"
          :is-black-header="block?.isBlackHeader"
        />
      </ErrorBoundaryBlock>
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed } from 'vue'

import { checkIsEmpty } from '../../../utils/checkIsEmpty'
import { getApiAddress } from '../../../utils/getApiAddress'
import SeoText from '../blocks/main/SeoText.vue'
import ErrorBoundaryBlock from '../blocks/misc/ErrorBoundaryBlock.vue'
import LoaderBlock from '../blocks/misc/LoaderBlock.vue'
import AboutTutors from '../blocks/products/details/AboutTutors.vue'
import StudentWorks from '../blocks/products/details/StudentWorks.vue'
import Header from '../blocks/schoolOffer/Header.vue'
import Offering from '../blocks/schoolOffer/Offering.vue'

// Init template
const props = defineProps<{
  head?: { title: string; description: string }
}>()

const head = computed(() => props.head)
useHead({
  title: head.value?.title || 'Clavis',
  meta: [
    {
      name: 'description',
      content: head.value?.description || 'Clavis website page',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://clavis-schule.de/',
    },
  ],
})

const { locale } = useI18n({ useScope: 'global' })

// API
const { data: product, pending } = await useAsyncData(
  'schoolOffer',
  () =>
    $fetch(getApiAddress(`/api/v2/wagtail/school-offers/`), {
      params: {
        locale: locale.value,
      },
    }),
  { watch: [locale], deep: true },
)

// Components for render
const blocksList = computed(() => [
  { name: Header, blockData: product.value?.items[0] },
  { name: Offering, blockData: product.value?.items[0].offering_block[0] },
  {
    name: AboutTutors,
    blockData: product.value?.items[0].instructors_block[0].value.instructors,
    hasButton: true,
  },
  {
    name: StudentWorks,
    blockData: product.value?.items[0].student_works_block[0]?.value.contents,
  },
  {
    name: SeoText,
    blockData: product.value?.items[0].seo_text[0],
    isBlackHeader: true,
  },
])
</script>
