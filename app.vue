<!-- eslint-disable vue-scoped-css/enforce-style-type -->
<!-- eslint-disable vue/block-lang -->
<!-- eslint-disable vue/block-lang -->
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="min-h-[100vh] flex flex-col overflow-x-hidden relative">
      <AppHeader />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <AppFooter v-if="$route.path !== '/menu'" />
    </div>
  </n-config-provider>
</template>
<script setup lang="ts">
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";

useHead({
  title: "Clavis Schule für Kunst und Wissenschaft",
  meta: [
    { charset: "UTF-8" },
    {
      name: "robots",
      content:
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    {
      name: "description",
      content:
        "In Clavis Schule finden Sie kreative Workshops in Berlin ✓Bildende Kunst ✓Naturwissenschaften ✓Theater ✓Sprachen → Alle Infos!",
    },
    { property: "og:locale", content: "de_DE" },
    { property: "og:type", content: "website" },
    {
      property: "og:title",
      content: "Clavis Schule für Kunst und Wissenschaft",
    },
    {
      property: "og:description",
      content:
        "In Clavis Schule finden Sie kreative Workshops in Berlin ✓Bildende Kunst ✓Naturwissenschaften ✓Theater ✓Sprachen → Alle Infos!",
    },
    { property: "og:url", content: "https://clavis-schule.de/" },
    { property: "og:site_name", content: "Clavis Schule" },
    { property: "article:modified_time", content: "2023-09-04T08:01:51+00:00" },
    {
      property: "og:image",
      content:
        "https://clavis-schule.de/wp-content/uploads/2023/08/Tag_der_offenen_-Tur_mob.png",
    },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  link: [
    { rel: "profile", href: "https://gmpg.org/xfn/11" },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://clavis-schule.de",
    },
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "canonical", href: "https://clavis-schule.de/" },
  ],
});

const themeOverrides = {
  common: {
    primaryColor: "rgb(34, 197, 94)",
    fontSize: "16px",
  },
};
</script>
<style>
body {
  font-family: Aeroport, sans-serif;
  background: white;
  font-size: 16px;
}
</style>
