<template>
  <div class="h-screen flex flex-col gap-2 mx-[28px] md:mx-[48px] mt-10">
    <h1 class="text-5xl">Скоро здесь будет главная...</h1>
    <p>Честно причестно</p>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: 'Clavis - Home',
  meta: [
    {
      name: 'description',
      content: "That's a home page at Clavis",
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://clavis-schule.de/',
    },
  ],
})
</script>
