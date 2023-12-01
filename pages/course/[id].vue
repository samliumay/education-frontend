<template>
  <AppSignIn :is-open="isOpen" @next="navigateTo(`/course/buy/${route.params.id}`)" />
  <HeaderBlock class="mt-[96px]" :product="product" type="course">
    <AppButton>Попробовать бесплатно</AppButton>
    <AppButton is-inverted @click="navigateTo(`/course/buy/${route.params.id}`)">Купить курс</AppButton>
  </HeaderBlock>
  <DescriptionBlock class="mt-[96px] mb-[96px]" :product="product" />
  <OptionsBlock :product="product" />
  <VideoBlock class="mt-[96px] mb-[96px]" />
</template>
<script setup lang="ts">
import { ref } from "vue"

import AppButton from "../../components/AppButton.vue"
import AppSignIn from "../../components/AppSignIn.vue"
import DescriptionBlock from "../../components/products/DescriptionBlock.vue"
import HeaderBlock from "../../components/products/HeaderBlock.vue"
import OptionsBlock from "../../components/products/OptionsBlock.vue"
import VideoBlock from "../../components/products/VideoBlock.vue"

const route = useRoute()

const isOpen = ref(false)

const { data: product } = await useFetch(`https://api.clavis.the-o.co/api/v1/products/${route.params.id}`, {deep: true})
</script>
