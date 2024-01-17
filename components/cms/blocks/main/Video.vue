<template>
  <div class="mx-[100px] md:mx-[140px] flex flex-col gap-10">
    <div class="flex justify-between gap-2 items-stretch">
      <h2 class="text-5xl font-medium text-brand-red w-5/12">Clavis Schule für Kunst und Wissenschaft</h2>
      <div class="w-[1px] bg-brand-gray" />
      <p class="w-5/12 text-black self-center">
        Clavis wurde mit dem Ziel ins Leben gerufen, das Interesse und die
        Neugier von Kindern und Jugendlichen zu fördern.
      </p>
    </div>

    <div class="w-full h-[520px] rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/Wn8wvis-fVk?si=t9xg8mHBYed_1-yL"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="object-cover w-full h-full"
      />
    </div>

    <div class="flex gap-4 justify-between">
      <div
        v-for="option in options"
        :key="option"
        class="flex gap-2 items-start"
      >
        <img
          src="../../../../assets/icons/star.svg"
          alt="Star"
          class="w-[20px] h-[20px]"
        />
        <p>{{ option }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// import type { PageBlock } from '../../../../types/cms'

// defineProps<{
//   item: PageBlock
// }>()

const options = [
  'Die Schüler*innen lernen in kleinen Gruppen, somit können wir auf die Bedürfnisse jedes einzelnen eingehen.',
  'Wir schaffen eine offene Umgebung als Basis für ein multisensorisches und multidisziplinäres Lernen.',
  'Wir schaffen eine offene Umgebung als Basis für ein multisensorisches und multidisziplinäres Lernen.',
]
</script>
