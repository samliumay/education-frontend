<template>
  <div>
    <n-h1 class="mb-4">Angebote für Schulen</n-h1>

    <n-h3>Clavis Workshops</n-h3>
    <p
      >Wir bieten für Schulen alle unsere angebotenen Kurse auch als Workshop
      an. Der Workshop kann bei Ihnen vor Ort oder in unseren Räumlichkeiten
      stattfinden.</p
    >
    <p>Dauer: 1,5-3h </p>
    <p
      >Bei Interesse
      <router-link
        class="text-red-400 font-bold underline"
        to="/kontaktieren-sie-uns"
        >kontaktieren Sie uns</router-link
      >
      gerne per Email oder Telefon.
    </p>

    <n-h3 class="mt-8">AGs und Ferienkurse</n-h3>
    <p
      >Gerne kooperieren wir mit Schulen bei der Organisation ihres Nachmittags
      oder Ferienprogramms bei uns oder bei ihnen vor Ort.</p
    >
    <p>Dauer: 3h </p>
    <p
      >Bei Interesse
      <router-link
        class="text-red-400 font-bold underline"
        to="/kontaktieren-sie-uns"
        >kontaktieren Sie uns</router-link
      >
      gerne per Email oder Telefon.
    </p>

    <n-h3 class="mt-8">Kursauswahl:</n-h3>
    <p>Zeichnen, Malen, Plastizieren (DE)</p>
    <p>Manga Zeichnen (DE/ENG)</p>
    <p>Digitales Zeichnen (DE/ENG)</p>
    <p>Mode Design (DE)</p>
    <p>Multimedia Art (EN)</p>
    <p>Animation Studio (DE/ENG)</p>
    <p>Theater (ENG)</p>
    <p>Maths and Sciences (ENG)</p>
    <p>Photo Lab (ENG)</p>
  </div>
</template>
<script setup lang="ts">
import { NH1, NH3 } from 'naive-ui'
import { RouterLink } from 'vue-router'
</script>
<style scoped lang="scss">
p {
  margin-bottom: 0.75rem;
}
</style>
