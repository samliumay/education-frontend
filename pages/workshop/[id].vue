<template>
  <HeaderBlock class="mt-[96px]" :product="product" type="course">
    <AppButton> Купить воркшоп </AppButton>
  </HeaderBlock>
  <DescriptionBlock class="mt-[96px] mb-[96px]" :product="product" />
</template>
<script setup lang="ts">
import DescriptionBlock from "../../components/products/DescriptionBlock.vue"
import HeaderBlock from "../../components/products/HeaderBlock.vue"

const page = ref({} as any)

useHead({
  title: page.value.title || "Clavis - Workshop",
  meta: [
    {
      name: "description",
      content:
        page.value.description ||
        "That's a page that contains information about a particular workshop available at Clavis",
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
  { deep: true },
)
</script>
