<template>
  <AppSignIn
    :is-open="isOpen"
    @close="isOpen = false"
    @next="navigateTo(`/academy/buy/${route.params.id}`)"
  />
  <HeaderBlock class="mt-[96px]" :product="product" type="course">
    <AppButton @click="handleSignIn"> Купить академию </AppButton>
  </HeaderBlock>
  <DescriptionBlock class="mt-[96px]" :product="product" />
  <VideoBlock class="mt-[96px] mb-[96px]" />
</template>
<script setup lang="ts">
import { ref } from "vue"

import AppButton from "../../components/AppButton.vue"
import AppSignIn from "../../components/AppSignIn.vue"
import DescriptionBlock from "../../components/products/DescriptionBlock.vue"
import HeaderBlock from "../../components/products/HeaderBlock.vue"
import VideoBlock from "../../components/products/VideoBlock.vue"
import { useUserStore } from "../../store/user"

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
  title: page.value.title || "Clavis - Academy",
  meta: [
    {
      name: "description",
      content:
        page.value.description ||
        "That's a page that contains information about a particular academy available at Clavis",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: page.value.canonical || "https://clavis-schule.de/",
    },
  ],
})

const { data: product } = await useFetch(
  `https://api.clavis.the-o.co/api/v1/products/${route.params.id}`,
  { deep: true },
)
</script>
