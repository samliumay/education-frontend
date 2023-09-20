<template>
  <div>
    <n-h1 class="mb-4">Angebote für Schulen</n-h1>

    <n-h2>Clavis Workshops</n-h2>
    <p>
      Wir bieten für Schulen alle unsere angebotenen Kurse auch als Workshop an.
      Der Workshop kann bei Ihnen vor Ort oder in unseren Räumlichkeiten
      stattfinden.
    </p>
    <p>Dauer: 1,5-3h </p>
    <p>
      Bei Interesse
      <router-link
        class="text-red-400 font-bold underline"
        to="/kontaktieren-sie-uns"
      >
        kontaktieren Sie uns
      </router-link>
      gerne per Email oder Telefon.
    </p>

    <n-h2 class="mt-8">AGs und Ferienkurse</n-h2>
    <p>
      Gerne kooperieren wir mit Schulen bei der Organisation ihres Nachmittags
      oder Ferienprogramms bei uns oder bei ihnen vor Ort.
    </p>
    <p>Dauer: 3h </p>
    <p>
      Bei Interesse
      <router-link
        class="text-red-400 font-bold underline"
        to="/kontaktieren-sie-uns"
      >
        kontaktieren Sie uns
      </router-link>
      gerne per Email oder Telefon.
    </p>

    <n-h2 class="mt-8">Kursauswahl:</n-h2>
    <ul>
      <li>Zeichnen, Malen, Plastizieren (DE)</li>
      <li>Manga Zeichnen (DE/ENG)</li>
      <li>Digitales Zeichnen (DE/ENG)</li>
      <li>Mode Design (DE)</li>
      <li>Multimedia Art (EN)</li>
      <li>Animation Studio (DE/ENG)</li>
      <li>Theater (ENG)</li>
      <li>Maths and Sciences (ENG)</li>
      <li>Photo Lab (ENG)</li>
    </ul>
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
