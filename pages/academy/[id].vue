<template>
  <div class="flex flex-col gap-12 mx-10">
    <AppSignIn
      :is-open="isOpen"
      @close="isOpen = false"
      @next="navigateTo(`/academy/buy/${route.params.id}`)"
    />

    <n-breadcrumb class="mt-6 mb-10">
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/">Главная</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/academies">Академии</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">
        {{ item.name }}
      </n-breadcrumb-item>
    </n-breadcrumb>

    <HeaderBlock v-if="!pending" :item="item" type="academy">
      <AppButton @click="handleSignIn"> Купить академию </AppButton>
    </HeaderBlock>
    <AboutCourse v-if="!pending" :item="item" />
  </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import AppButton from '../../components/AppButton.vue'
import AppSignIn from '../../components/AppSignIn.vue'
import AboutCourse from '../../components/cms/blocks/products/details/AboutCourse.vue'
import HeaderBlock from '../../components/cms/blocks/products/details/HeaderBlock.vue'
import { useUserStore } from '../../store/user'

const page = ref({} as any)
const isOpen = ref(false)

const route = useRoute()

const userStore = useUserStore()

const handleSignIn = () => {
  if (userStore.isLoggedIn) {
    isOpen.value = true
  } else {
    navigateTo(`/academy/buy/${route.params.id}`)
  }
}

useHead({
  title: page.value.title || 'Clavis - Academy',
  meta: [
    {
      name: 'description',
      content:
        page.value.description ||
        "That's a page that contains information about a particular academy available at Clavis",
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: page.value.canonical || 'https://clavis-schule.de/',
    },
  ],
})

const { data: item, pending } = await useFetch(
  `https://api.clavis.the-o.co/api/v2/wagtail/products/${route.params.id}/?fields=*`,
  { deep: true },
)

console.debug(item)
</script>
