<template>
  <LoaderBlock v-if="pending" />
  <main v-else class="flex flex-col gap-2 mb-10">
    <n-breadcrumb class="mt-6 mb-10 px-10">
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/">{{ $t('common.main') }}</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink :to="catalogPath">{{ product?.product_type }}</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">
        {{ product?.name }}
      </n-breadcrumb-item>
    </n-breadcrumb>

    <div class="flex flex-col gap-10">
      <ErrorBoundaryBlock>
        <HeaderBlock
          v-if="!pending"
          :block-data="product"
          :type="product?.product_type?.toLocaleLowerCase()"
        >
          <AppButton
            v-show="product?.product_type !== 'Event'"
            @click="navigateTo(`/product/buy/${route.params.id}`)"
          >
            Купить продукт
          </AppButton>
        </HeaderBlock>
      </ErrorBoundaryBlock>

      <ErrorBoundaryBlock v-for="(block, index) in blocksList" :key="index">
        <component
          :is="block.name"
          v-if="checkIsEmpty(block.blockData)"
          :block-data="block.blockData"
        />
      </ErrorBoundaryBlock>
    </div>
  </main>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { checkIsEmpty } from '../../../utils/checkIsEmpty'
import { getApiAddress } from '../../../utils/getApiAddress'
import AppButton from '../../AppButton.vue'
import ErrorBoundaryBlock from '../blocks/misc/ErrorBoundaryBlock.vue'
import LoaderBlock from '../blocks/misc/LoaderBlock.vue'
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

const route = useRoute()

// API
const { data: product, pending } = useFetch(
  getApiAddress(`/api/v2/wagtail/products/${route.params.id}/?fields=*`),
  { deep: true },
)

const catalogPath = computed(() => {
  switch (String(product.value?.product_type).toLocaleLowerCase()) {
    case 'course':
      return '/courses'
    case 'academy':
      return '/academies'
    default:
      return '/workshops'
  }
})

// Components for render
const blocksList = computed(() => [
  { name: AboutCourse, blockData: product.value?.body },
  { name: PaymentOptions, blockData: product.value?.purchase_options },
  { name: CourseProgram, blockData: product.value?.program },
  { name: AboutTutors, blockData: product.value?.instructors },
  { name: StudentWorks, blockData: product.value?.student_works },
  { name: QuestionsAnswers, blockData: product.value?.qna },
])
</script>
