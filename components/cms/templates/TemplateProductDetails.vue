<template>
  <div v-if="pending" class="my-20 flex justify-center">
    <AppLoader />
  </div>
  <main v-else class="flex flex-col gap-2 mb-10">
    <AppSignIn :is-open="isOpen" @close="isOpen = false" />

    <n-breadcrumb class="mt-6 mb-10 px-10">
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/">Главная</NuxtLink>
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
          <AppButton @click="handleSignIn">Купить продукт</AppButton>
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
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useUserStore } from '../../../store/user'
import { checkIsEmpty } from '../../../utils/checkIsEmpty'
import AppButton from '../../AppButton.vue'
import AppLoader from '../../AppLoader.vue'
import AppSignIn from '../../AppSignIn.vue'
import ErrorBoundaryBlock from '../blocks/misc/ErrorBoundaryBlock.vue'
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

// Flags
const isOpen = ref(false)

// Store
const route = useRoute()
const userStore = useUserStore()

// API
const { data: product, pending } = await useFetch(
  `https://api.clavis.the-o.co/api/v2/wagtail/products/${route.params.id}/?fields=*`,
  { deep: true },
)

// Actions
const handleSignIn = () => {
  if (!userStore.isLoggedIn) {
    isOpen.value = true
  } else {
    navigateTo(`/product/buy/${route.params.id}`)
  }
}

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

// Mock items
const mockTutorsItems = [
  {
    id: 'tutor-1',
    first_name: 'Иван',
    last_name: 'Иванов',
    category: 'Математика',
    title_img: {
      meta: {
        download_url:
          'https://plus.unsplash.com/premium_photo-1663011158241-9b03859902df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      title: 'Иван Иванов',
    },
  },
  {
    id: 'tutor-2',
    first_name: 'Мария',
    last_name: 'Петрова',
    category: 'Физика',
    title_img: {
      meta: {
        download_url:
          'https://images.unsplash.com/photo-1597570889212-97f48e632dad?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      title: 'Мария Петрова',
    },
  },
]

// Components for render
const blocksList = computed(() => [
  { name: AboutCourse, blockData: product.value?.body },
  { name: PaymentOptions, blockData: product.value?.purchase_options },
  { name: CourseProgram, blockData: product.value?.program },
  { name: AboutTutors, blockData: mockTutorsItems },
  { name: StudentWorks, blockData: product.value?.student_works },
  { name: QuestionsAnswers, blockData: product.value?.qna },
])
</script>
