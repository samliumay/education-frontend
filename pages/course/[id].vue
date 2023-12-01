<template>
  <HeaderBlock class="mt-[96px]" :product="product || {}" type="course">
    <AppButton>Попробовать бесплатно</AppButton>
    <AppButton
      is-inverted
      @click="navigateTo(`/course/buy/${route.params.id}`)"
    >
      Купить курс
    </AppButton>
  </HeaderBlock>
  <DescriptionBlock class="mt-[96px] mb-[96px]" :product="product" />
  <OptionsBlock :product="product" />
  <VideoBlock class="mt-[96px] mb-[96px]" />
</template>
<script setup lang="ts">
import { ref } from "vue"

import AppButton from "../../components/AppButton.vue"
import DescriptionBlock from "../../components/products/DescriptionBlock.vue"
import HeaderBlock from "../../components/products/HeaderBlock.vue"
import OptionsBlock from "../../components/products/OptionsBlock.vue"
import VideoBlock from "../../components/products/VideoBlock.vue"

const page = ref({} as any)

useHead({
  title: page.value.title || "Clavis - Course",
  meta: [
    {
      name: "description",
      content:
        page.value.description ||
        "That's a page that contains information about a particular course available at Clavis",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: page.value.canonical || "https://clavis-schule.de/",
    },
  ],
})

const route = useRoute()

const { data: product } = await useFetch(
  `https://api.clavis.the-o.co/api/v1/products/${route.params.id}`,
)
</script>
