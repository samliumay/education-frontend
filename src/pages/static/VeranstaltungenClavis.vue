<template>
  <div>
    <n-h1 class="mb-4">Veranstaltungen bei Clavis</n-h1>

    <p>
      Gerne organisieren wir mit Ihnen gemeinsam einen Kindergeburtstag oder
      einen Workshop bei Clavis. die Veranstaltung kann bei Ihnen vor Ort oder
      in unseren Räumlichkeiten stattfinden.
    </p>

    <n-h2>WKindergeburtstag 5-8 Jahre</n-h2>
    <p>
      Für die Kinder ist Ihr Geburtstag immer ein ganz Besonderer Tag. Wir
      planen gerne mit Ihnen zusammen einen unvergesslichen Kindergeburstag.
    </p>
    <p>
      Der Kindergeburtstag bei Clavis beinhaltet zwei getrennt Workshops a 1,5h,
      die Workshop Themen können Sie aus unserer angbotenen Kusliste auswählen,
      gerne beraten wir Sie bei der Wahl.
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

    <n-h2 class="mt-8">Privater Workshop 8+ Jahre</n-h2>
    <p>
      Private Workshops kann für unterschiedliche Anlässe geplant werden. Gerne
      passen wir uns individuell Ihren Wünschen an, dabei beraten wir Sie gerne
      in der Wahl des Workshops.
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
import { NH1, NH2 } from 'naive-ui'
import { RouterLink } from 'vue-router'
</script>
<style scoped lang="scss">
p {
  margin-bottom: 0.75rem;
}
</style>
