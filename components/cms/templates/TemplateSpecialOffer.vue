<template>
  <LoaderBlock v-if="pending" />
  <main v-else class="flex flex-col gap-2 mb-10">
    <n-breadcrumb class="mt-6 mb-10 px-10">
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/">{{ $t('common.main') }}</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink>{{ $t('common.specialOffer') }}</NuxtLink>
      </n-breadcrumb-item>
    </n-breadcrumb>

    <div v-if="!checkIsEmpty(special)" class="flex flex-col gap-10">
      <ErrorBoundaryBlock>
        <HeaderBlock
          v-if="!pending"
          :id="special.id"
          :block-data="special"
          type="special"
        />
      </ErrorBoundaryBlock>

      <ErrorBoundaryBlock v-for="(block, index) in blocksList" :key="index">
        <component
          :is="block.name"
          v-if="!checkIsEmpty(block.blockData)"
          :block-data="block.blockData"
        />
      </ErrorBoundaryBlock>
    </div>
    <AppNotFound v-else />
  </main>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { computed } from 'vue'

import AppNotFound from '@/components/AppNotFound.vue'

import { checkIsEmpty } from '../../../utils/checkIsEmpty'
import { getApiAddress } from '../../../utils/getApiAddress'
import ErrorBoundaryBlock from '../blocks/misc/ErrorBoundaryBlock.vue'
import LoaderBlock from '../blocks/misc/LoaderBlock.vue'
import RichText from '../blocks/misc/RichText.vue'
import AboutCourse from '../blocks/products/details/AboutCourse.vue'
import AboutTutors from '../blocks/products/details/AboutTutors.vue'
import CourseProgram from '../blocks/products/details/CourseProgram.vue'
import HeaderBlock from '../blocks/products/details/HeaderBlock.vue'
import PaymentOptions from '../blocks/products/details/PaymentOptions.vue'
import QuestionsAnswers from '../blocks/products/details/QuestionsAnswers.vue'
import StudentWorks from '../blocks/products/details/StudentWorks.vue'

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
const { data: specials, pending } = await useAsyncData(
  'products',
  () =>
    $fetch(getApiAddress(`/api/v2/wagtail/special-offers/`), {
      params: {
        locale: locale.value,
        fields: '*',
      },
    }),
  { watch: [locale], deep: true },
)

const special = computed(() => {
  if (!pending.value) return specials.value?.items?.[0]

  return {}
})

// Components for render
const blocksList = computed(() => [
  { name: AboutCourse, blockData: special.value?.body },
  { name: PaymentOptions, blockData: special.value?.purchase_options },
  { name: CourseProgram, blockData: special.value?.program },
  { name: AboutTutors, blockData: special.value?.instructors },
  { name: StudentWorks, blockData: special.value?.student_works },
  { name: QuestionsAnswers, blockData: special.value?.qna },
  { name: RichText, blockData: special.value?.seo_text },
])
</script>
