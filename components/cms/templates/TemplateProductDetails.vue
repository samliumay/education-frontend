<template>
  <div v-if="pending" class="my-20 flex justify-center">
    <AppLoader />
  </div>
  <div v-else class="flex flex-col gap-12 mx-10">
    <AppSignIn
      :is-open="isOpen"
      @close="isOpen = false"
    />

    <n-breadcrumb class="mt-6 mb-10">
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/">Главная</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/academies">{{ item?.product_type }}</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">
        {{ item?.name }}
      </n-breadcrumb-item>
    </n-breadcrumb>

    <ErrorBoundaryBlock>
      <HeaderBlock
        v-if="!pending"
        :item="item"
        :type="item?.product_type?.toLocaleLowerCase()"
      >
        <AppButton @click="handleSignIn"> Купить продукт </AppButton>
      </HeaderBlock>
      <ErrorBoundaryBlock />

      <ErrorBoundaryBlock />
      <AboutCourse v-if="!pending" :items="aboutCourseItems" />
    </ErrorBoundaryBlock>

    <ErrorBoundaryBlock>
      <PaymentOptions v-if="!pending" :items="paymentOptionsItems" />
    </ErrorBoundaryBlock>

    <ErrorBoundaryBlock>
      <CourseProgram v-if="!pending" :items="programItems" />
    </ErrorBoundaryBlock>

    <ErrorBoundaryBlock>
      <AboutTutors v-if="!pending" :items="mockTutorsItems" />
    </ErrorBoundaryBlock>

    <ErrorBoundaryBlock>
      <QuestionsAnswersVue v-if="!pending" :items="mockQuestionsItems" />
    </ErrorBoundaryBlock>
  </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useUserStore } from '../../../store/user'
import AppButton from '../../AppButton.vue'
import AppLoader from '../../AppLoader.vue'
import AppSignIn from '../../AppSignIn.vue'
import ErrorBoundaryBlock from '../blocks/misc/ErrorBoundaryBlock.vue'
import AboutCourse from '../blocks/products/details/AboutCourse.vue'
import AboutTutors from '../blocks/products/details/AboutTutors.vue'
import CourseProgram from '../blocks/products/details/CourseProgram.vue'
import HeaderBlock from '../blocks/products/details/HeaderBlock.vue'
import PaymentOptions from '../blocks/products/details/PaymentOptions.vue'
import QuestionsAnswersVue from '../blocks/products/details/QuestionsAnswers.vue'

const props = defineProps<{
  head?: { title: string; description: string }
}>()

const isOpen = ref(false)

const route = useRoute()

const userStore = useUserStore()

const handleSignIn = () => {
  if (!userStore.isLoggedIn) {
    isOpen.value = true
  } else {
    navigateTo(`/product/buy/${route.params.id}`)
  }
}

// API
const { data: item, pending } = await useFetch(
  `https://api.clavis.the-o.co/api/v2/wagtail/products/${route.params.id}/?fields=*`,
  { deep: true },
)

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

const aboutCourseItems = [
  {
    id: '1',
    title_img: {
      meta: {
        download_url:
          'https://media.istockphoto.com/id/1395605908/photo/aerial-top-down-amazing-lake-of-round-shape-cloudy-sky-reflected-in-clear-turquoise-water-of.jpg?s=2048x2048&w=is&k=20&c=w2wemF4apqxpqHucYy3SlQCUwW0rW1dU6rL-GcWA1b4=',
      },
      title: 'Image 1',
    },
    title: 'Уделяем внимание каждому ученику',
    description:
      'Занятия проходят в просторной студии с интересными предметами и работами художников. Окружающая среда и дружеское общение дают возможность молодым художникам развиваться',
  },
  {
    id: '2',
    title_img: {
      meta: {
        download_url:
          'https://media.istockphoto.com/id/1395605908/photo/aerial-top-down-amazing-lake-of-round-shape-cloudy-sky-reflected-in-clear-turquoise-water-of.jpg?s=2048x2048&w=is&k=20&c=w2wemF4apqxpqHucYy3SlQCUwW0rW1dU6rL-GcWA1b4=',
      },
      title: 'Image 2',
    },
    title: 'Уделяем внимание каждому ученику',
    description:
      'Занятия проходят в просторной студии с интересными предметами и работами художников. Окружающая среда и дружеское общение дают возможность молодым художникам развиваться',
  },
]

const paymentOptionsItems = [
  {
    id: 'tariff-1',
    icon_img: {
      meta: {
        download_url:
          'https://media.istockphoto.com/id/1395605908/photo/aerial-top-down-amazing-lake-of-round-shape-cloudy-sky-reflected-in-clear-turquoise-water-of.jpg?s=2048x2048&w=is&k=20&c=w2wemF4apqxpqHucYy3SlQCUwW0rW1dU6rL-GcWA1b4=', // Замените на актуальный URL иконки
      },
      title: 'Иконка тарифа 1', // Замените на описание иконки
    },
    title: 'Базовый',
    options: [
      'Опция 1 тарифа Базовый',
      'Опция 2 тарифа Базовый',
      // Добавьте другие опции
    ],
    price: '100 ₽/мес',
  },
  {
    id: 'tariff-2',
    icon_img: {
      meta: {
        download_url:
          'https://media.istockphoto.com/id/1395605908/photo/aerial-top-down-amazing-lake-of-round-shape-cloudy-sky-reflected-in-clear-turquoise-water-of.jpg?s=2048x2048&w=is&k=20&c=w2wemF4apqxpqHucYy3SlQCUwW0rW1dU6rL-GcWA1b4=', // Замените на актуальный URL иконки
      },
      title: 'Иконка тарифа 2', // Замените на описание иконки
    },
    title: 'Профессиональный',
    options: [
      'Опция 1 тарифа Профессиональный',
      'Опция 2 тарифа Профессиональный',
      // Добавьте другие опции
    ],
    price: '200 ₽/мес',
  },
  // Добавьте больше объектов тарифов, если это необходимо
]

const programItems = [
  {
    id: 'program-1',
    title: 'Сессия 1',
    title_img: {
      meta: {
        download_url:
          'https://media.istockphoto.com/id/1395605908/photo/aerial-top-down-amazing-lake-of-round-shape-cloudy-sky-reflected-in-clear-turquoise-water-of.jpg?s=2048x2048&w=is&k=20&c=w2wemF4apqxpqHucYy3SlQCUwW0rW1dU6rL-GcWA1b4=', // Замените на актуальный URL изображения
      },
      title: 'Изображение Сессии 1', // Замените на описание изображения
    },
    description: 'Описание Сессии 1 - детали сессии, спикеры, темы и т.д.',
  },
  {
    id: 'program-2',
    title: 'Сессия 2',
    title_img: {
      meta: {
        download_url:
          'https://media.istockphoto.com/id/1395605908/photo/aerial-top-down-amazing-lake-of-round-shape-cloudy-sky-reflected-in-clear-turquoise-water-of.jpg?s=2048x2048&w=is&k=20&c=w2wemF4apqxpqHucYy3SlQCUwW0rW1dU6rL-GcWA1b4=', // Замените на актуальный URL изображения
      },
      title: 'Изображение Сессии 2', // Замените на описание изображения
    },
    description: 'Описание Сессии 2 - детали сессии, спикеры, темы и т.д.',
  },
]

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

const mockQAItems = [
  {
    id: 'qa-1',
    title: 'Как начать обучение?',
    description: 'Для начала обучения вам необходимо зарегистрироваться на нашем сайте, выбрать интересующий курс и пройти вступительное тестирование.'
  },
  {
    id: 'qa-2',
    title: 'Какие формы оплаты вы принимаете?',
    description: 'Мы принимаем оплату через банковские карты, электронные кошельки и другие популярные платежные системы.'
  },
];
</script>
